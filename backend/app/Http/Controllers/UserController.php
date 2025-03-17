<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function signUp (Request $request) {

        $request->validate([
            "name" => "required|string",
            "password" => "required|string"
        ]);

        if(User::where("name", "=", $request->name)->exists())
            return response()->json(["message" => "Já existe um usuário com esse nome", "status" => 0], 200);

        User::create([
            "name" => $request->name,
            "password" => Hash::make($request->password)
        ]);

        return response()->json(["message" => "Usuário criado com sucesso", "status" => 1], 201);

    }

    public function signIn (Request $request) {

        $request->validate([
            "name" => "required|string",
            "password" => "required|string"
        ]);

        if((User::where('name', '=', $request->name)->exists()) && (Hash::check($request->password, (User::select('password')->where('name', '=', $request->name)->first()->toArray())['password'])))
            return response()->json(["message" => "Sign-in concluído com sucesso"], 200);
        
        return response()->json(["message" => "Login ou senha inválidos."], 400);

    }

}
