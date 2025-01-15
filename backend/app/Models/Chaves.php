<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chaves extends Model
{
    protected $table = 'chaves';

    protected $fillable = [
        'id_pessoa',
        'id_imovel',
    ];
}
