<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoStatusImoveis extends Model
{
    protected $table = 'tipo_status_imoveis';

    protected $fillable = [
        'descricao',
    ];
}
