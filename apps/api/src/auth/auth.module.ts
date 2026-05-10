import { Global, Module } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';

// @Global makes JwtAuthGuard and RolesGuard injectable in any feature module
// without requiring each module to import AuthModule explicitly.
@Global()
@Module({
  providers: [JwtAuthGuard, RolesGuard],
  exports:   [JwtAuthGuard, RolesGuard],
})
export class AuthModule {}
