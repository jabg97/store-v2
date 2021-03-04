<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\AlgorithmController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

*/


Route::post('algorithm/sort', [AlgorithmController::class, 'sort'])->name('algorithm.sort');
Route::post('algorithm/exp', [AlgorithmController::class, 'exp'])->name('algorithm.exp');


Route::post('auth/login', [AuthController::class, 'login'])->name('auth.login');
Route::post('auth/register', [AuthController::class, 'register'])->name('auth.register');


Route::post('profile/update', [ProfileController::class, 'update'])->name('profile.update');
Route::get('profile/info/{id}', [ProfileController::class, 'info'])->name('profile.info');


Route::get('product/index', [ProductController::class, 'index'])->name('product.index');
Route::get('product/info/{id}/{user}', [ProductController::class, 'info'])->name('product.info');
Route::post('product/upload', [ProductController::class, 'upload'])->name('product.upload');
Route::post('product/query', [ProductController::class, 'query'])->name('product.query');
Route::post('product/update', [ProductController::class, 'update'])->name('product.update');
Route::post('product/delete', [ProductController::class, 'delete'])->name('product.delete');


Route::post('comment/publish', [CommentController::class, 'publish'])->name('comment.publish');
Route::post('comment/like', [CommentController::class, 'like'])->name('comment.like');
Route::post('comment/dislike', [CommentController::class, 'dislike'])->name('comment.dislike');
Route::post('comment/delete', [CommentController::class, 'delete'])->name('comment.delete');


Route::get('cart/index/{user}', [CartController::class, 'index'])->name('cart.index');
Route::post('cart/add', [CartController::class, 'add'])->name('cart.add');
Route::post('cart/add_item', [CartController::class, 'add_item'])->name('cart.add.item');
Route::post('cart/rem_item', [CartController::class, 'rem_item'])->name('cart.rem.item');
Route::post('cart/del_item', [CartController::class, 'del_item'])->name('cart.del.item');
Route::post('cart/clear', [CartController::class, 'clear'])->name('cart.clear');


