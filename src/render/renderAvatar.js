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

export async function renderImage(
  character,
  { format = 'jpg', size = 1080, transparent = false, thumbnail = false } = {}
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

  if (normalized === 'png') {
    const buffer = await sharp(Buffer.from(svg)).png().toBuffer();
    return {
      buffer,
      contentType: 'image/png',
      ext: 'png',
    };
  }

  const buffer = await sharp(Buffer.from(svg))
    .flatten({ background: '#ffffff' })
    .jpeg({ quality: 92 })
    .toBuffer();

  return {
    buffer,
    contentType: 'image/jpeg',
    ext: 'jpg',
  };
}
