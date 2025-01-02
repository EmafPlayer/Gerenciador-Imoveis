<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoRecorrencia extends Model
{
    protected $table = 'tipo_recorrencia';

    protected $fillable = [
        'descricao',
    ];
}
