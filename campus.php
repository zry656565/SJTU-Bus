<?php
// Include and instantiate the class.
require_once 'include/Mobile_Detect.php';
$detect = new Mobile_Detect;

if ($detect->isMobile() && !$detect->isTablet()) {
    require('wap.php');
} else {
    require('web.php');
}