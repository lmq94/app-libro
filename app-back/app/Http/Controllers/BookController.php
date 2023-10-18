<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use Illuminate\Support\Facades\Validator;

//Controlador encargado de manejar la logica a todo lo referido con la entidad book

class BookController extends Controller
{

    //Reglas de validacion de datos para actualizacion o alta de libros
    protected $rules = [
        'name' => 'required|string|max:30',
        'author' => 'required|string|max:30',
        'edition_date' => 'required|date|date_format:Y-m-d|before:today',
       
    ];


    //Mensajes de error que la api notificara al usuario en caso de que no se cumpla alguna regla de validacion
    protected $messages = [
        'name.required' => 'El nombre es requerido.',
        'author.required' => 'El autor es requerido.',
        'edition_date.required' => 'La fecha de edicion es requerida.',
        'name.string' => 'El name debe ser una cadena de texto.',
        'autor.string' => 'El autor debe ser una cadena de texto.',
        'edition_date.date' => 'La fecha de edicion debe ser una fecha.',
        'name.max' => 'El nombre no puede tener mas de 30 caracteres.',
        'author.max' => 'El nombre no puede tener mas de 30 caracteres.',
        'edition_date.date_format' => 'La fecha de Edición debe tener el formato Y-m-d.',
        'edition_date.before' => 'La fecha de edicion no puede ser posterior a la fecha actual'
    ];


    //Devuelve todos los libros en la base de datos
    public function index(){


        $books = Book::all();

        
        return response()->json($books);

    }

    //Devuelve si existe un libro en la base de datos dado un id
    public function show($id){

        $book = Book::find($id);

        if($book)
            return response()->json($book);
        else
            return response( "No se encuentra el libro solicitado", 204);
    }

    
    // Busca un libro por nombre o autor (o ambos) y lo devuelve si existe
    public function search(Request $request) {
        $name = $request->input('name');
        $author = $request->input('author');
    
        $query = Book::query(); 
    
        if (!empty($name)) {
            $query->where('name', 'LIKE', "%$name%");
        }
    
        if (!empty($author)) {
            $query->where('author', 'LIKE', "%$author%");
        }
    
        $books = $query->get(); 
    
        return response()->json($books);
    }


    //Crea un libro respetando las reglas de validacion
    public function create (Request $request){

        $validator = Validator::make($request->all(), $this->rules, $this->messages);

        
        if ($validator->fails())
            return response()->json(['errors' => $validator->errors()], 400);
        
        else {
            $book = new Book( ['name' => $request->get('name'),
                              'author' => $request->get('author'),
                              'edition_date' => $request->get('edition_date')
                             ]);

            $book->save();

            return response()->json($book);
        }     

    }

    //Actualiza un libro respetando las reglas de validacion
    public function update(Request $request, $id){

        $book = Book::find($id);
    
        if($book) {
            $validator = Validator::make($request->all(), $this->rules, $this->messages);
    
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 400); 
            } else {
                $book->update([
                    'name' => $request->get('name'),
                    'author' => $request->get('author'),
                    'edition_date' => $request->get('edition_date'), 
                ]);
                return response()->json($book);
            }
        } else {
            return response()->json("No existe el libro que quiere actualizar", 404);    
        }
    }


    //Borra un libro si este existe
    public function delete($id){

        $book = Book::find($id);

        if ($book) {
            $book->delete();
            return response()->json('El libro se ha eliminado correctamente', 204);
        } else {
            return response()->json('El libro que intenta eliminar no existe', 404);
        }

    }




}