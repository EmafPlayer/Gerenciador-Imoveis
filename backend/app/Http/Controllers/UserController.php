<?php

namespace App\Http\Controllers;

use App\Models\User;
use Database\Seeders\RoleSeeder;
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
            return response()->json(["message" => "Já existe um usuário com esse username"], 200);

        User::create([
            "name" => $request->name,
            "password" => Hash::make($request->password),
            "id_rule" => User::exists() ? 2 : 1
        ]);

        return response()->json(["message" => "Usuário criado com sucesso"], 201);

    }

    public function signIn (Request $request) {

        $request->validate([
            "name" => "required|string",
            "password" => "required|string"
        ]);

        if((User::where('name', '=', $request->name)->exists()) && (Hash::check($request->password, (User::select('password')->where('name', '=', $request->name)->first()->toArray())['password'])))
            return response()->json(["message" => "Sign-in concluído com sucesso"], 202);
        
        return response()->json(["message" => "Login ou senha inválidos."], 200);

    }

    public function returnRule($username) {

        $rule = User::join('rules', 'users.id_rule', '=', 'rules.id')->select('rules.descricao')->where('users.name', '=', $username)->get()->first();

        if($rule)
            return response()->json(["rule" => $rule['descricao']], 200);

        return response()->json(["message" => "Erro ao carregar Rule"],400);

    }

}
