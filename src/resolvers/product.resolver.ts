import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import ProductService from "../../service/product.server";
import { CreateProductInput, GetProductInput, Product } from "../schema/product.schema";
import Context from "../types/context";

@Resolver()
export default class ProductResolver {
    constructor(private productService: ProductService) {
        this.productService = new ProductService();
    };

    @Authorized()
    @Mutation(() => Product)
    createPoduct(@Arg('input') input: CreateProductInput, @Ctx() context: Context) {
        const user = context.user!;
        return this.productService.createProduct({ ...input, user: user?._id })
    }

    @Query(() => [Product])
    products() {
        return this.productService.findProducts();
    }

    @Query(() => Product)
    product(@Arg('input') input: GetProductInput){
        return this.productService.findSingleProduct(input);
    }

}

