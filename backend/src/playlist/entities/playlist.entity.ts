import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { SectionEntity } from 'src/section/entities/section.entity';
import { SermonEntity } from 'src/sermon/entities/sermon.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('playlist')
export class PlaylistEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ name: 'title', type: 'varchar' })
  @IsString()
  title: string;

  @ApiProperty()
  @Column({ name: 'description', type: 'varchar' })
  @IsString()
  description: string;

  @ApiProperty({ type: () => SectionEntity, isArray: true })
  @ManyToMany(() => SectionEntity, (section) => section.playlists, {
    onDelete: 'CASCADE',
  })
  sections: SectionEntity[];

  @ApiProperty({ type: () => SermonEntity, isArray: true })
  @ManyToMany(() => SermonEntity, (sermon) => sermon.playlists, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  sermons: SermonEntity[];
}
