import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AddProdcut, UpdateProduct } from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product)
    private _productRepo: Repository<Product>) { }


    async addProduct(dto: AddProdcut) {
        try {
            await this._productRepo.save(this._productRepo.create(dto))
            return {
                code: HttpStatus.CREATED,
                message: "“Product added successfully”"
            }
        } catch (e) {
            throw new BadRequestException('Something bad happened', { description: 'Some error description' })
        }
    }

    async updateProduct(id: number, dto: UpdateProduct) {
        try {
            await this._productRepo.update(id, dto)
            return {
                code: HttpStatus.OK,
                message: "“Product updated successfully”"
            }
        } catch (e) {
            throw new BadRequestException('Something bad happened', { description: 'Some error description' })
        }
    }

    async deleteProduct(id: number) {
        try {
            await this._productRepo.softDelete(id);
            return {
                code: HttpStatus.OK,
                message: "“Product deleted successfully”"
            }
        } catch (e) {
            throw new BadRequestException('Something bad happened', { description: 'Some error description' })
        }
    }


    async fetchProducts() {
        try {

            return {
                data: await this._productRepo.find({}),
                code: HttpStatus.OK,
                message: "“Product sent successfully”"
            }
        } catch (e) {
            throw new BadRequestException('Something bad happened', { description: 'Some error description' })
        }
    }

}
