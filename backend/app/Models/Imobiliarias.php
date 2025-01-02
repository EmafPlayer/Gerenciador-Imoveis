<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Imobiliarias extends Model
{
    protected $table = 'imobiliarias';

    protected $fillable = [
        'nome',
        'id_endereco',
        'email',
        'site',
        'contato',
    ];
}
