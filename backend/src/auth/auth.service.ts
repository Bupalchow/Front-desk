import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from '../typeorm/entities/Staff.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    private jwtService: JwtService,
  ) {}

  async validateStaff(username: string, password: string): Promise<any> {
    const staff = await this.staffRepository.findOne({ where: { username } });
    if (staff && await bcrypt.compare(password, staff.password)) {
      const { password, ...result } = staff;
      return result;
    }
    return null;
  }

  async login(username: string, password: string) {
    const staff = await this.validateStaff(username, password);
    if (!staff) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: staff.id, username: staff.username, role: staff.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: { username: string; password: string; name: string }) {
    // Check if username already exists
    const exists = await this.staffRepository.findOne({
      where: { username: registerDto.username }
    });

    if (exists) {
      throw new ConflictException('Username already exists');
    }

    const staff = this.staffRepository.create(registerDto);
    await this.staffRepository.save(staff);
    
    const { password, ...result } = staff;
    return result;
  }
}