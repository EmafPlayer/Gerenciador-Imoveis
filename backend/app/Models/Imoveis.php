<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Imoveis extends Model
{
    protected $table = 'imoveis';

    protected $fillable = [
        'nome',
        'id_endereco',
        'id_localizacao',
        'anunciado',
    ];
}
