<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Corretores extends Model
{
    protected $table = 'corretores';

    protected $fillable = [
        'id_imobiliaria',
        'nome',
        'telefone',
        'email',
    ];
}
