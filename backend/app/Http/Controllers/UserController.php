<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function signUp (Request $request) {

        $request->validate([
            "name" => "required|string",
            "password" => "required|string"
        ]);

        if(User::where("name", "=", $request->name)->exists())
            return response()->json(["message" => "Já existe um usuário com esse nome"], 400);

        User::create([
            "name" => $request->name,
            "password" => Hash::make($request->password)
        ]);

        return response()->json(["message" => "Usuário criado com sucesso"], 400);

    }

    public function signIn (Request $request) {

        

    }

}
