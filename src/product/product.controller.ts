import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { AddProdcut, UpdateProduct } from './dto/product.dto';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { Roles } from 'src/user/decorators/role.decorator';
import { RolesGuard } from 'src/user/guards/roles.guard';

@Controller('product')
@ApiTags("Product")
export class ProductController {

    constructor(
        private readonly _productService: ProductService

    ) { }

    @ApiBearerAuth()
    @Roles('ADMIN', 'SELLER')
    @UseGuards(AuthGuard)
    @UseGuards(RolesGuard)
    @Post()
    async createProduct(@Body() dto: AddProdcut) {
        return await this._productService.addProduct(dto);
    }


    @ApiBearerAuth()
    @Roles('ADMIN', 'SELLER')
    @UseGuards(AuthGuard)
    @UseGuards(RolesGuard)
    @Patch(":id")
    async updateProduct(@Param("id") id: number, @Body() dto: UpdateProduct) {
        return await this._productService.updateProduct(id, dto);
    }


    @ApiBearerAuth()
    @Roles('ADMIN', 'SUPPORTER')
    @UseGuards(AuthGuard)
    @UseGuards(RolesGuard)
    @Delete(":id")
    async deleteProduct(@Param("id") id: number) {
        return await this._productService.deleteProduct(id);
    }

    @ApiBearerAuth()
    @Roles('ADMIN', 'SELLER', 'CUSTOMER', 'SUPPORTER')
    @UseGuards(AuthGuard)
    @UseGuards(RolesGuard)
    @Get()
    async getProduct() {
        return await this._productService.fetchProducts();
    }

}
