import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

function looksLikeEmail(identifier: string) {
  return identifier.includes('@');
}

function parseBigInt(identifier: string) {
  // Prisma expects BigInt values for BIGINT columns.
  try {
    return BigInt(identifier);
  } catch {
    return null;
  }
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private serializeUser(user: any) {
    return {
      id: user.id.toString(),
      email: user.email,
      name: user.name,
      firstname: user.firstname,
      createdAt: user.createdAt,
    };
  }

  async findByIdentifier(identifier: string) {
    if (looksLikeEmail(identifier)) {
      const user = await this.prisma.user.findUnique({ where: { email: identifier } });
      if (!user) throw new NotFoundException('User not found');
      return this.serializeUser(user);
    }

    const id = parseBigInt(identifier);
    if (id === null) throw new BadRequestException('Invalid user identifier');

    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return this.serializeUser(user);
  }

  async update(identifier: string, dto: UpdateUserDto) {
    if (!Object.keys(dto).length) {
      throw new BadRequestException('No fields to update');
    }

    let updated;
    if (looksLikeEmail(identifier)) {
      updated = await this.prisma.user.update({
        where: { email: identifier },
        data: {
          name: dto.name,
          firstname: dto.firstname,
          email: dto.email,
        },
      });
    } else {
      const id = parseBigInt(identifier);
      if (id === null) throw new BadRequestException('Invalid user identifier');

      updated = await this.prisma.user.update({
        where: { id },
        data: {
          name: dto.name,
          firstname: dto.firstname,
          email: dto.email,
        },
      });
    }

    return this.serializeUser(updated);
  }

  async remove(identifier: string) {
    let where: { id?: bigint; email?: string };
    if (looksLikeEmail(identifier)) where = { email: identifier };
    else {
      const id = parseBigInt(identifier);
      if (id === null) throw new BadRequestException('Invalid user identifier');
      where = { id };
    }

    await this.prisma.user.delete({ where: where as any });
    return { deleted: true };
  }
}

