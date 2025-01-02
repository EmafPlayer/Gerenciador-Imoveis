<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Acontecimentos extends Model
{
    protected $table = 'acontecimentos';

    protected $fillable = [
        'id_imovel',
        'titulo',
        'descricao',
        'data_hora_inicio',
        'ultima_alteracao',
        'status_acontecimento',
    ];
}
