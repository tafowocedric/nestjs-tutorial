import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Query,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOkResponse({ type: User, isArray: true })
    @ApiQuery({ name: 'name', required: false })
    @Get()
    getUsers(@Query('name') name: string): User[] {
        return this.usersService.findAll(name);
    }

    @ApiOkResponse({ type: User, isArray: false })
    @ApiNotFoundResponse()
    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number): User {
        const user = this.usersService.findById(id);

        if (!user) throw new NotFoundException();

        return this.usersService.findById(id);
    }

    @ApiCreatedResponse({ type: User })
    @ApiBadRequestResponse()
    @Post()
    createUser(@Body() body: CreateUserDto): User {
        return this.usersService.createUser(body);
    }
}
