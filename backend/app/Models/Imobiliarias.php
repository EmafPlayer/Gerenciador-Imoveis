<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Imobiliarias extends Model
{
    protected $table = 'imobiliarias';

    protected $fillable = [
        'nome_fantasia',
        'nome_oficial',
        'id_endereco',
        'id_localizacao',
        'email',
        'site',
        'contato',
    ];
}
