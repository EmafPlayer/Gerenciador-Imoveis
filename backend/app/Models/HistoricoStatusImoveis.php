<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HistoricoStatusImoveis extends Model
{
    protected $table = 'historico_status_imoveis';

    protected $fillable = [
        'id_imovel',
        'ultima_alteracao',
        'tipo_status',
    ];
}
