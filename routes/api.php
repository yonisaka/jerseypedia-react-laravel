<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PesananController;
use App\Http\Controllers\LigaController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/products', [ProductController::class, 'index']);
Route::get('/product/{id}', [ProductController::class, 'show']);

Route::post('/pesanan', [PesananController::class, 'store']);
Route::get('/pesanan/{user_id}', [PesananController::class, 'show']);
Route::get('/pesanan/total_cart/{user_id}', [PesananController::class, 'total_cart']);
Route::post('/pesanan/checkout', [PesananController::class, 'checkout']);
Route::delete('/pesanan/{id}', [PesananController::class, 'destroy']);

Route::get('/ligas', [LigaController::class, 'show']);


// AUTH
Route::post("user-signup", [UserController::class, 'userSignUp']);
Route::post("user-login", [UserController::class, 'userLogin']);
Route::get("user/{email}", [UserController::class, 'userDetail']);