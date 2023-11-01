import { describe, it, expect } from 'vitest';
import { listFileMetadata } from '@/api/fileMetadataApi';

describe('fileMetadataApi', () => {
  it('has the correct object keys', () => {
    const data = listFileMetadata();
    expect(Object.keys(data[0])).toEqual(['name', 'device', 'path', 'status']);
  });
});
