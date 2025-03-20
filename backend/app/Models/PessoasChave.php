<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PessoasChave extends Model
{
    protected $table = 'pessoas_chave';

    protected $fillable = [
        'nome_completo',
        'contato',
    ];
}
