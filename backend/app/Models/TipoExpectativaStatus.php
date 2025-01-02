<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoExpectativaStatus extends Model
{
    protected $table = 'tipo_expectativa_status';

    protected $fillable = [
        'descricao',
    ];
}
