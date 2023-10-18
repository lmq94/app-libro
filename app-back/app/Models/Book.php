<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


// Modelo encargado de consultar, insertar, actualizar y eliminar datos de la entidad book en la base de datos
class Book extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'author', 'edition_date'];


}
    