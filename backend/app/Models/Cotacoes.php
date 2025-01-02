<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cotacoes extends Model
{
    protected $table = 'cotacoes';

    protected $fillable = [
        'id_imovel',
        'valor',
        'data_cotacao',
        'descricao',
        'tipo_cotacao',
    ];
}
