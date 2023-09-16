import { Injectable } from '@nestjs/common';
import { Permission } from './entities/permissions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class PermissionsService {
    constructor(
        @InjectRepository(Permission)
        private _permissionRepo: Repository<Permission>,
    ) {
        this.seedData();
    }


    async findPermissionByName(...permissions:string[]){
        console.log("=======",permissions)
        return await this._permissionRepo.find({
            where:{
                name:In(permissions)
            }
        })
    }

    /**
     * This is for seeding database with initial data.Later on we can have specific module for the seeders
     */

    async seedData() {
        const permissions = await this._permissionRepo.find();
        if (permissions.length <= 0) {
            await this._permissionRepo.save([
                {
                    name: 'create'
                }, {
                    name: 'update'
                }, {
                    name: 'fetch'
                }, {
                    name: 'delete'
                }
            ])
        }
    }

}
