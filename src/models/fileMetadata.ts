export interface FileMetadata {
  name: string;
  device: string;
  path: string;
  status: 'scheduled' | 'available';
}

export interface TableFileMetadata extends FileMetadata {
  id: number;
  selected: boolean;
}
