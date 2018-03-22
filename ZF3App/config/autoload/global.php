<?php
/**
 * Global Configuration Override
 *
 * You can use this file for overriding configuration values from modules, etc.
 * You would place values in here that are agnostic to the environment and not
 * sensitive to security.
 *
 * @NOTE: In practice, this file will typically be INCLUDED in your source
 * control, so do not include passwords or other sensitive information in this
 * file.
 */

function _l($d) {
    error_log(var_export($d, true));
}
function _lm($d) {
    error_log(var_export(get_class_methods($d), true));
}
function _lc($d) {
    error_log(var_export(get_class($d), true));
}
function _lt($d) {
    error_log(var_export(gettype($d), true));
}

return [
    'db' => [
        'driver' => 'Pdo',
        'dsn'    => sprintf('sqlite:%s/data/zftutorial.db', realpath(getcwd())),
    ],
];
