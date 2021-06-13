<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
 
        return $products->toJson();
    }

    public function show($id)
    {
        $product = Product::join('ligas','ligas.id','=','products.liga_id')
                    ->select('products.*','ligas.gambar AS liga_gambar')
                    ->where('products.id','=',$id)
                    ->first();
        // $product = Product::find($id);
 
        return $product->toJson();
    }
}
