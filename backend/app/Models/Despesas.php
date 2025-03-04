<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Despesas extends Model
{
    protected $table = 'despesas';

    protected $fillable = [
        'id_imovel',
        'titulo',
        'descricao',
        'tipo_despesa',
        'tipo_recorrencia',
        'vencimento',
        'receita_despesa',
        'valor',
        'pago',
    ];
}
