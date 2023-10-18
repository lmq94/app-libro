<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


//migracion encargada de crear la estructura de la tabla de la entidad Book
return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->String('name', 30);
            $table->String('author', 30);
            $table->date('edition_date');
            $table->timestamps();
        });
    }

   
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
