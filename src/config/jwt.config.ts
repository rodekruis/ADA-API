import { JwtModuleOptions } from '@nestjs/jwt';

const jwtConfig: JwtModuleOptions = {
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '6h' },
};

export default jwtConfig;
