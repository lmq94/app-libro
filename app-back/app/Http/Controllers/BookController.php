<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use app\models\Book;
use Illuminate\Support\Facades\Validator;

class BookController extends Controller
{
    protected $rules = [
        'name' => 'required|string|max:30',
        'author' => 'required|string|max:30',
        'edition_date' => 'required|date|date_format:d/m/Y|before:today',
       
    ];

    protected $messages = [
        'name.required' => 'El nombre es requerido.',
        'autor.required' => 'El autor es requerido.',
        'edition_date.required' => 'La fecha de edicion es requerida.',
        'name.string' => 'El name debe ser una cadena de texto.',
        'autor.string' => 'El autor debe ser una cadena de texto.',
        'edition_date.date' => 'La fecha de edicion debe ser una fecha.',
        'name.max' => 'El nombre no puede tener mas de 30 caracteres.',
        'author.max' => 'El nombre no puede tener mas de 30 caracteres.',
        'edition_date.date_format' => 'La fecha de Edición debe tener el formato dd/mm/yyyy.',
        'edition_date.before' => 'La fecha de edicion no puede ser posterior a la fecha actual'
    ];


    public function index(){

        $books = Book::all();

        return response()->json($books);

    }

    public function show($id){

        $book = Book::find($id);

        if($book)
            return response()->json($book);
        else
            return response("No se encuentra el libro solicitado", 204);
    }


    public function create (Request $request){

        $validator = Validator::make($request->all(), $this->rules, $this->messages);

        
        if ($validator->fails()) 
            return response()->json(['errors' => $validator->errors()], 400);
        
        else {
            $book = new Book( ['name' => $request->get('name'),
                              'autor' => $request->get('author'),
                              'edition_date' => $request->get('$edition_date'), 
                             ]);

            $book->save();

            return response()->json($book);
        }     

    }

    public function update(Request $request, $id){

        $book = Book::find($id);
    
        if($book) {
            $validator = Validator::make($request->all(), $this->rules, $this->messages);
    
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 400); 
            } else {
                $book->update([
                    'name' => $request->get('name'),
                    'autor' => $request->get('author'),
                    'edition_date' => $request->get('edition_date'), 
                ]);
                return response()->json($book);
            }
        } else {
            return response()->json("No existe el libro que quiere actualizar", 404);    
        }
    }


    public function delete($id){

        $book = Book::find($id);

        if ($book) {
            $book->delete();
            return response()->json('El ibro se ha eliminado correctamente');
        } else {
            return response()->json('El libro que intenta eliminar no existe', 404);
        }

    }




}