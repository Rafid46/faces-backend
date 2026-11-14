import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import sharp from 'sharp';
import CharacterArt from './characterArt.js';

export function renderSvg(character, { size = 480, transparent = false, thumbnail = false } = {}) {
  const width = Math.min(2160, Math.max(64, Number.parseInt(size, 10) || 480));
  const height = Math.round((width * 540) / 480);
  const markup = renderToStaticMarkup(
    React.createElement(CharacterArt, { character, transparent, thumbnail })
  );
  return markup.replace('<svg ', `<svg width="${width}" height="${height}" `);
}

const RASTER_CACHE_LIMIT = 100;
const rasterCache = new Map();

function rememberRaster(key, image) {
  rasterCache.set(key, image);
  if (rasterCache.size > RASTER_CACHE_LIMIT) {
    rasterCache.delete(rasterCache.keys().next().value);
  }
  return image;
}

export async function renderImage(
  character,
  { format = 'jpg', size = 480, transparent = false, thumbnail = false } = {}
) {
  const normalized = format === 'jpeg' ? 'jpg' : format;
  const svg = renderSvg(character, { size, transparent, thumbnail });

  if (normalized === 'svg') {
    return {
      buffer: Buffer.from(svg, 'utf8'),
      contentType: 'image/svg+xml; charset=utf-8',
      ext: 'svg',
    };
  }

  const key = `${normalized}|${svg}`;
  const cached = rasterCache.get(key);
  if (cached) {
    rasterCache.delete(key);
    return rememberRaster(key, cached);
  }

  if (normalized === 'png') {
    const buffer = await sharp(Buffer.from(svg)).png().toBuffer();
    return rememberRaster(key, {
      buffer,
      contentType: 'image/png',
      ext: 'png',
    });
  }

  const buffer = await sharp(Buffer.from(svg))
    .flatten({ background: '#ffffff' })
    .jpeg({ quality: 92 })
    .toBuffer();

  return rememberRaster(key, {
    buffer,
    contentType: 'image/jpeg',
    ext: 'jpg',
  });
}
