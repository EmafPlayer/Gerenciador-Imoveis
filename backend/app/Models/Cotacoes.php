<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cotacoes extends Model
{
    protected $table = 'cotacoes';

    protected $fillable = [
        'id_imovel',
        'id_corretor',
        'valor',
        'valor_min',
        'valor_max',
        'data_cotacao',
        'descricao',
        'tipo_cotacao',
    ];
    
}
