<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ArquivosAcontecimentos extends Model
{
    protected $table = 'arquivos_acontecimentos';

    protected $fillable = [
        'id_acontecimento',
        'endereco',
        'descricao',
    ];
}
