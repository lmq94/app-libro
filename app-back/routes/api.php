<?php



use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

    //Endpoints de mi api
    Route::get('books', [BookController::class, 'index']);
    Route::get('book/{id}', [BookController::class, 'show']);
    Route::get('books/search', [BookController::class, 'search']);
    Route::post('books', [BookController::class, 'create']);
    Route::put('book/{id}', [BookController::class, 'update']);
    Route::delete('book/{id}', [BookController::class, 'delete']);
