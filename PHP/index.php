<?php

$key = hex2bin("882E91D56547F1CF7ED6BAAD9C3EAAF5");
$iv = hex2bin("2811da22377d62fcfdb02f29aad77d9e");
$data = "test";

$encrypted = encrypt ($key, $iv, $data) ;   
printf("256-bit encrypted result:\n%s\n<br/>",$encrypted);

$encrypted = 'PL7OFt0LzPm827qNQmJZSS8iiQ6iZNu1bAhTvPYJ0bM=';
$encrypted = "zp3v1p98JYF2ke9MuDIVFA==";

$decrypted = decrypt ($key, $iv, $encrypted) ; 
printf("256-bit decrypted result:\n%s\n\n",$decrypted);


function toPkcs7 ($value)
{
        if ( is_null ($value) )
                $value = "" ;

        $padSize = 16 - (strlen ($value) % 16) ;
        return $value . str_repeat (chr ($padSize), $padSize) ;
}

function fromPkcs7 ($value)
{
        $valueLen = strlen ($value) ;
        if ( $valueLen % 16 > 0 )
                $value = "";
        $padSize = ord ($value{$valueLen - 1}) ;
        if ( ($padSize < 1) or ($padSize > 16) )
                $value = "";
        // Check padding.
        for ($i = 0; $i < $padSize; $i++)
        {
                if ( ord ($value{$valueLen - $i - 1}) != $padSize )
                        $value = "";
        }
        return substr ($value, 0, $valueLen - $padSize) ;
}

function encrypt ($key, $iv, $value)
{
        if ( is_null ($value) )
                $value = "" ;
        $value = toPkcs7 ($value) ;
        $output = mcrypt_encrypt (MCRYPT_RIJNDAEL_128, $key, 
        $value, MCRYPT_MODE_CBC, $iv) ;

        return base64_encode ($output) ;
}

function decrypt ($key, $iv, $value)
{    
            if ( is_null ($value) )
                $value = "" ;   
        $value = base64_decode ($value) ;
        $output = mcrypt_decrypt (MCRYPT_RIJNDAEL_128, $key, 
          $value, MCRYPT_MODE_CBC, $iv) ;

        $output = fromPkcs7 ($output) ;
        return $output;
} 

// 02v1O9JNakIQduxpirzoWw==