import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/lib/models/Product';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const rating = searchParams.get('rating');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');

    let query: any = {};

    if (category) {
      const categoryArray = category.split(",");
      query.category = { $in: categoryArray };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (rating) {
      query.ecoRating = { $gte: Number(rating) };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    let productsQuery = Product.find(query);

    if (sort) {
      const sortOptions: any = {
        price_asc: { price: 1 },
        price_desc: { price: -1 },
        rating_desc: { ecoRating: -1 },
        newest: { createdAt: -1 },
      };
      productsQuery = productsQuery.sort(
        sortOptions[sort] || { createdAt: -1 },
      );
    } else {
      productsQuery = productsQuery.sort({ createdAt: -1 });
    }

    const products = await productsQuery;
    return NextResponse.json(products);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const product = new Product(body);
    const savedProduct = await product.save();
    return NextResponse.json(savedProduct, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
