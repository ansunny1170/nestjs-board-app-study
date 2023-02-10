import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { User } from "./auth.entity";
import { AuthCredentialDto } from "./dto/auth-credential.dto";

export class UserRepository extends Repository<User> {
    constructor(@InjectRepository(User) private dataSource: DataSource) {
        super(User, dataSource.manager)
    }

    async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
        const { username, password } = authCredentialDto;
        const user = this.create({ username, password })

        await this.save(user);        
    }
}