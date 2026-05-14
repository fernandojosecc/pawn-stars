import { Module } from '@nestjs/common';
import { ArticleGenerationController } from './article-generation.controller';
import { ArticleGenerationService } from './article-generation.service';

@Module({
  controllers: [ArticleGenerationController],
  providers: [ArticleGenerationService],
  exports: [ArticleGenerationService],
})
export class ArticleGenerationModule {}
