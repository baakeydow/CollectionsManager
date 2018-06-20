title: Collection of work notes \o/
layout: not defined yet :D
---
***

# CheatSheet

---

<br><br>
> [Design Patterns in Back-end Development](https://github.com/binhnguyennus/awesome-scalability)  
[Data Science: Getting Started](https://medium.com/@sumukhakaparthi/data-science-getting-started-28cdbf5aa234)  
[Learning OOP in PHP](https://github.com/marcelgsantos/learning-oop-in-php)  
[PhpDesignPatterns.pdf](https://21times2.com/up/pdf/phpDesignPatterns.pdf)  
[MLForDummies.pdf](https://21times2.com/up/pdf/MLForDummies.pdf)  
[Free Software Network Services](https://github.com/Kickball/awesome-selfhosted)  
[Curated list of awesome lists](https://github.com/sindresorhus/awesome)  
[The official Exploit Database repository](https://github.com/offensive-security/exploit-database)  
[Path to a free self-taught education in Computer Science!](https://github.com/ossu/computer-science)  
[Scan for open S3 buckets and dump](https://github.com/sa7mon/S3Scanner)  
[A multi-threaded tool for resumable Wordpress bruteforcing](https://github.com/sa7mon/press)  
[Welcome to the NetSPI SQL Injection Wiki!](https://sqlwiki.netspi.com/)

<br><br>

---

> Shell
======

---

<br><br>

***# Checking/Fixing/Creating things***
> ``` bash
=> setup new user to a new db:
CREATE USER 'news'@'localhost' IDENTIFIED BY 'newspass';
CREATE DATABASE news;
CREATE TABLE `news` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `author` varchar(30) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `dateAdded` datetime NOT NULL,
  `dateModif` datetime NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;
GRANT ALL PRIVILEGES on news.* to 'news'@'localhost' IDENTIFIED BY 'newspass';
FLUSH PRIVILEGES;
SHOW GRANTS FOR 'news'@'localhost';
mysqldump -u news -pnewspass --databases news > news.sql
```

> ``` bash
=> mount ntfs to osx:
brew install ntfs-3g
diskutil list // (it finds disk2s1)
sudo mkdir /Volumes/NTFS
sudo /usr/local/bin/ntfs-3g /dev/disk2s1 /Volumes/NTFS -olocal -oallow_other
```

> ``` bash
=> rtfm:
find . \( -name '*~' -o -name '#*#' \) -print -delete
groups $FT_USER | sed 's/ /,/g' | tr -d '\n'
find . \( -name '*.sh' \) -print | sed 's/\(.*\)\///g' | sed 's/\.sh//g'
( find . -type d && find . -type f ) | wc -l | sed 's/ //g'
ifconfig | grep ether | sed 's/\(.*\)ether //g'
ls -l | sed 'n;d'
cat /etc/passwd | sed '/^#/d' | sed -n 'n;p' | sed 's/:\(.*\)//g' | rev | sort -r | awk 'NR >= ENVIRON["FT_LINE1"] && NR <= ENVIRON["FT_LINE2"]' | tr '\n' ' ' | sed 's/ /, /g' | sed 's/\(.*\), /\1./' | tr -d '\n'
```

> ``` bash
=> misc:
open -a atom -e file.txt
rsync -alPvz $PWD/folderOrFileToSend [USER@]HOST:DEST
find . -name 'iris*' -type f
cut -d ',' -f 5 iris.csv
tail -n 150 iris.csv | cut -d "," -f 5 | uniq -c
awk '/setosa/ { print $0 }' iris.csv
grep -i "vir" iris.csv
sed 's/setosa/iris-setosa/g' iris.csv > output.csv
tar -czf dump.tar.gz dump
tar -xzvf gwsocket-0.2.tar.gz
sudo dmidecode | grep -A3 '^System Information'
sudo lsof -P | grep TCP | grep LISTEN
sudo lsof -i:8080
ss -tapn
nmap -sP 192.168.1.0/24
arp -a
nmap -p 1-65535 -T4 -A -v ip_found
du -hs .
df -H
lspci | grep VGA
lscpu
lshw
hwinfo
xdpyinfo | grep resolution
history | head -n 200
xrandr --list-providers
lsusb
w
alias vfix="vagrant halt && vagrant up --provision"
tailf /var/log/mongodb/mongodb.log
sudo tailf /var/log/syslog
sudo tailf /var/log/nginx/error.log
```

***# Goaccess launch live report***
> ``` bash
goaccess /home/log/nginx/access.log -o /path/to/static/folder/report.html \
-m --with-mouse \
-i --hl-header \
-d --with-output-resolver \
--ignore-crawlers \
--all-static-files \
--log-format=COMBINED \
--real-time-html \
--sort-panel=VISITORS,BY_DATA,DESC \
--sort-panel=REQUESTS,BY_VISITORS,DESC \
--ssl-cert=/etc/letsencrypt/live/website.com/fullchain.pem \
--ssl-key=/etc/letsencrypt/live/website.com/privkey.pem \
--ws-url=wss://website.com
```

***# Var to pm2***
> ``` bash
NODE_ENV=production pm2 start server.js -n app_name
```

***# Mongodb collections***
> ``` bash
mongodump --db=my_db --collection=my_collection --out=my_new_folder
mongorestore --db=<new_db_name> --collection=<new_collection_name> [my_new_folder|<db_name>|<collection_name>.bson]
```

<br><br>

---

> Nginx
======

---

<br><br>

***# Request to php-fpm***
> ``` bash
location / {
	try_files $uri $uri/ /index.php?$args;
	include fastcgi_params;
	fastcgi_pass unix:/var/run/php/php7.0-fpm.sock;
	fastcgi_split_path_info ^(.+\.php)(/.+)$;
	fastcgi_index public/index.php;
	fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
	allow 127.0.0.1;
	fastcgi_param HTTPS on;
}
```

***# Request to nodejs***
> ``` bash
location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_pass http://127.0.0.1:8000;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;
    proxy_redirect off;
}
```

<br><br>

---

> Regex
======

---

<br><br>

***# Start with word***
> ``` bash
 ^word
```

***# End with word***
> ``` bash
 word$
```

***# Match any of***
> ``` bash
 gr[io]s
 gris|gros
```

***# Match any letters/numbers***
> ``` bash
 [a-zA-Z0-9]
```

***# Refuse any number***
> ``` bash
 [^0-9]
```

***# Specify an optional letter/word 0 or 1***
> ``` bash
 a?
```

***# Specify an optional letter/word 0 or ++***
> ``` bash
 a*
```

***# Specify a mandatory letter/word***
> ``` bash
 a+
 [0-9]+
```

***# Specify range | ? === {0,1} | + === {1,} | &#42; === {0,}***
> ``` bash
 a{3,5}
 a{3,}
```

***# Quantifiers***
> ``` bash
 *: 0 or more
 +: 1 or more
 ?: 0 or 1
 {3: Exactly 3
 {3,}: 3 or more
 {3,5}: 3, 4 or 5
```

***# Pattern Modifiers***
> ``` bash
 g: Global match
 i: Case-i­nse­nsitive
 m: Multi-line mode. Causes ^ and $ to also match the start/end of lines.
 s: Single-line mode. Causes . to match all, including line breaks.
 x: Allow comments and whitespace in pattern
 e: Evaluate replac­ement
 U: Ungreedy mode
```

***# Shortcuts***
> ``` bash
 \d: [0-9]
 \D: [^0-9]
 \w: [a-zA-Z0-9_]
 \W: [^a-zA-Z0-9_]
 \t: tab
 \n: newline
 \r: backspace
 \s: whitespace
 \S: nor \n \s \t
 .: everything
 frenchTelephoneNumber: ^0[1-68]([-. ]?[0-9]{2}){4}$
 email: ^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$
```

***<div style="text-align: center">[Online Regex Degugger](https://regex101.com)</div>***

<br>

---

> PHP
======

---

<br><br>

***# Log things***
``` bash
    error_log(var_export($d, true));
    error_log(var_export(get_class_methods($d), true));
    error_log(var_export(get_class($d), true));
    error_log(var_export(gettype($d), true));
    trigger_error("Nope You cannot do that", E_USER_ERROR);
```

***# Cookie_crisp***
``` php
<?php
    if (isset($_GET["action"]) && isset($_GET["name"]))
    {
        if ($_GET["action"] == "del")
    		setcookie($_GET["name"], NULL, -1);
    	elseif ($_GET["action"] == "set") {
    		setcookie($_GET["name"], $_GET["value"], time() + (7 * 24 * 60 * 60));
    	}
    	elseif ($_GET["action"] == "get") {
    		if (isset($_COOKIE[$_GET["name"]]))
    			echo $_COOKIE[$_GET["name"]];
    		if (isset($_COOKIE[$_GET["name"]]))
    			echo "\n";
    	}
    }
?>
```
***# Basics***
``` php
<?php
    echo htmlspecialchars("sameThing\n");
?>
<?=
    htmlspecialchars("sameThing\n")
?>
<?php
    use \App\Console\Commands\Inspire;

    protected $commands = [
        Inspire::class, // Equivalent to "\App\Console\Commands\Inspire"
    ];
?>
<?php
    class A {

        public function getClassName(){
            return __CLASS__;
        }

        public function getRealClassName() {
            return static::class;
        }
    }

    class B extends A {}

    $a = new A;
    $b = new B;

    echo $a->getClassName();      // A
    echo $a->getRealClassName();  // A
    echo $b->getClassName();      // A
    echo $b->getRealClassName();  // B
?>
```

***# Inheritance***
``` php
<?php
    class TestParent
    {
        public function __construct()
        {
            static::who();
        }

        public static function who()
        {
            echo "I go last\n";
        }
    }
    class TestChild extends TestParent
    {
        public function __construct()
        {
            static::who();
        }

        public function test()
        {
            $o = new TestParent();
        }

        public static function who()
        {
            echo "I go first\n";
        }
    }
    $o = new TestChild;
    $o->test();
?>
<?php
    class Mother
    {
        public $public0 = 'I\'m public';
        public $public1 = 'I\'m public too';

        protected $Protected0 = 'I\'m protected ';
        protected $Protected1 = 'I\'m protected too';

        private $private0 = 'I\'m private';
        private $private1 = 'I\'m private too';

        function listeAttributes()
        {
            foreach ($this as $attribute => $value)
            {
                echo $attribute, '=> ', $value, "\n";
            }
        }
    }
    class Child extends Mother
    {
        function listeAttributes()
        {
            foreach ($this as $attribute => $value)
            {
                echo $attribute, '=> ', $value, "\n";
            }
        }
    }
    $motherInstance = new Mother;
    $childInstance = new Child;
    echo "---- From Mother ----\n";
    $motherInstance->listeAttributes();
    echo "\n---- From Child ----\n";
    $childInstance->listeAttributes();
    echo "\n---- From Global Script ----\n";
    foreach ($motherInstance as $attribute => $value)
    {
        echo $attribute, '=> ', $value, "\n";
    }
?>
```

***# Interface / Trait***
``` php
<?php
	trait LOGMessageWithDateTime {
		public function echoText($text)
		{
			echo "\nOn " . date('l jS \of F Y h:i:s A') . " =>\n\n" . $text;
		}
	}
	trait LOGInfo {
		public function echoText($text)
		{
			echo $text;
		}
		public function echoMethods($text)
		{
			error_log(var_export(get_class_methods($text), true));
		}
	}

    interface iA
    {
        const GREETING = "Hello ...";
    }
    interface iB
    {
        public function setValues($values);
    }
    interface iC extends iA, iB, SeekableIterator, ArrayAccess, Countable
    {
        public function getValues();
    }

    abstract class Implem implements iC
    {
        private $index = 0;
        private $values = ["0", "1", "2", "3", "4"];

        public function getValues()
        {
            return $this->values;
    	}

        // SeekableIterator methods

        public function current()
        {
            return $this->values[$this->index];
        }
        public function key()
        {
            return $this->index;
        }
        public function next()
        {
            $this->index++;
        }
        public function rewind()
        {
            $this->index = 0;
        }
        public function seek($position)
        {
            $anciennePosition = $this->index;
            $this->index = $position;
            if (!$this->valid())
            {
                trigger_error('index does not exist', E_USER_WARNING);
                $this->index = $anciennePosition;
            }
        }
        public function valid()
        {
            return isset($this->values[$this->index]);
        }

        // ArrayAccess methods

        public function offsetExists($key)
        {
            return isset($this->values[$key]);
        }
        public function offsetGet($key)
        {
            return $this->values[$key];
        }
        public function offsetSet($key, $value)
        {
            $this->values[$key] = $value;
        }
        public function offsetUnset($key)
        {
            unset($this->values[$key]);
        }

        // Countable method

        public function count()
        {
            return count($this->values);
        }
    }

    final class Locked extends Implem {
        public function setValues($values) {
            foreach ($values as $key => $value) {
                if ($values[$key]) {
                    $this->offsetSet($key, $values[$key]);
                }
            }
        }
        public function deleteValues($values) {
            foreach ($values as $key => $value) {
                $this->offsetUnset($key);
            }
        }
    }

    class RunScript {
        use LOGMessageWithDateTime, LOGInfo {
            LOGMessageWithDateTime::echoText insteadof LOGInfo;
            LOGInfo::echoText as logSimpleLine;
        }
        public function run() {
            date_default_timezone_set('Europe/Paris');
            $instance = new Locked;
            $lockedInstance = new ReflectionObject($instance);
            $this->echoText("The Locked Class has these methods: ");
            $this->echoMethods($instance);
            $this->logSimpleLine("\nInterfaces used: " . var_export($lockedInstance->getInterfaces(), true) . "\n\n");
            $this->logSimpleLine(Implem::GREETING . " ");
            $this->logSimpleLine("The Locked class has an array of " . count($instance) . " values\n");
            $instance->setValues(["one", "two", "three", "four", "I got them !"]);
            $instance->setValues(["one", "two", "Interface and Traits ?"]);
            $instance->seek(2);
            $this->logSimpleLine("\n" . $instance->current());
            $instance->seek(4);
            $this->logSimpleLine("\n" . $instance->current());
            $valid = ($instance[4] == $instance->getValues()[4] && $instance[4] == $instance->current());
            $this->logSimpleLine("\n\nyep that's ". var_export($valid, true) . " !!!!\n\n");
            $instance->deleteValues($instance->getValues());
            foreach ($instance as $key => $value)
            {
                echo $key, ' => ', $value, "\n";
            }
        }
    }

    $script = new RunScript;
    $scriptInstance = new ReflectionObject($script);
    $script->run();
    $script->logSimpleLine("Traits used during script: " . var_export($scriptInstance->getTraits(), true) . "\n");
    unset($script);
?>
```

***# Generators***
``` php
<?php
    function readLines($fileName)
    {
        if (!$file = fopen($fileName, 'r')) return;

        while (($line = fgets($file)))
        {
            yield $line;
        }

        fclose($file);
    }

    foreach (readLines('package.json') as $line)
    {
        print_r($line);
    }
?>
<?php
    function task1()
    {
        for ($i = 1; $i <= 2; $i++)
        {
            $data = yield;
            echo 'Task 1, run ', $i, ', value : ', $data, "\n";
        }
    }

    function task2()
    {
        for ($i = 1; $i <= 2; $i++)
        {
            $data = yield;
            echo 'Task 2, run ', $i, ', value : ', $data, "\n";
        }
    }

    function task3()
    {
        for ($i = 1; $i <= 2; $i++)
        {
            $data = yield;
            echo 'Task 3, run ', $i, ', value : ', $data, "\n";
        }
    }

    class TaskRunner
    {
        protected $tasks;

        public function __construct()
        {
            $this->tasks = new SplQueue;
        }
        public function addTask(Generator $task)
        {
            $this->tasks->enqueue($task);
        }
        public function run()
        {
            while (!$this->tasks->isEmpty())
            {
                $task = $this->tasks->dequeue();
                $task->send('Hello world !');
                if ($task->valid()) $this->addTask($task);
            }
        }
    }

    $taskRunner = new TaskRunner;
    $taskRunner->addTask(task1());
    $taskRunner->addTask(task2());
    $taskRunner->addTask(task3());
    $taskRunner->run();
?>
<?php
    class TaskRunner
    {
        protected $tasks;

        public function __construct()
        {
            $this->tasks = new SplQueue;
        }

        public function addTask(Generator $task)
        {
            $this->tasks->enqueue($task);
        }

        public function run()
        {
            $i = 1;

            while (!$this->tasks->isEmpty())
            {
                // pop task
                $task = $this->tasks->dequeue();

                // throw exception
                if ($i == 5)
                {
                    error_log(var_export($task, true));
                    $task->throw(new Exception('Task interrupted because I said so !'));
                }

                // Playing the task
                $task->send('Hello world !');

                // If the task is not finished we put it back to the end of the queue
                if ($task->valid())
                {
                    $this->addTask($task);
                }

                $i++;
            }
        }
    }

    $taskRunner = new TaskRunner;

    function task1()
    {
        for ($i = 1; $i <= 2; $i++)
        {
            try {
                $data = yield;
                echo 'Task 1, turn ', $i, ', value sent : ', $data, "\n";
            } catch(Exception $e) {
                echo 'Error task 1 : ', $e->getMessage(), "\n";
                return;
            }
        }
    }

    function task2()
    {
        for ($i = 1; $i <= 6; $i++)
        {
            try {
                $data = yield;
                echo 'Task 2, turn ', $i, ', value sent : ', $data, "\n";
            } catch(Exception $e) {
                echo 'Error task 2 : ', $e->getMessage(), "\n";
                return;
            }
        }
    }

    function task3()
    {
        for ($i = 1; $i <= 4; $i++)
        {
            try {
                $data = yield;
                echo 'Task 3, turn ', $i, ', value sent : ', $data, "\n";
            } catch(Exception $e) {
                echo 'Error task 3 : ', $e->getMessage(), "\n";
                return;
            }
        }
    }

    $taskRunner->addTask(task1());
    $taskRunner->addTask(task2());
    $taskRunner->addTask(task3());

    $taskRunner->run();
?>
<?php
    class SomeClass
    {
        protected $attr;

        public function __construct()
        {
            $this->attr = ['One', 'Two', 'Three', 'Four'];
        }

        // return values by reference
        public function &generator()
        {
            foreach ($this->attr as &$val)
            {
                yield $val;
            }
        }

        public function attr()
        {
            return $this->attr;
        }
    }

    $obj = new SomeClass;

    // Run through by reference
    foreach ($obj->generator() as &$val)
    {
        // just doing something for the sake of it
        $val = strrev($val);
    }

    error_log(var_export($obj->attr(), true));
    echo "\n";
?>
<?php
    function generator()
    {
        while (1) {
            echo yield;
        }
    }

    $gen = generator();
    $gen->send("Message 1\n");
    $gen->send("Message 2\n");
    $gen->send("Message 3\n");
?>
<?php
    class TaskRunner
    {
        protected $tasks;

        public function __construct()
        {
            $this->tasks = new SplQueue;
        }

        public function addTask(Generator $task)
        {
            $this->tasks->enqueue($task);
        }

        public function run()
        {
            while (!$this->tasks->isEmpty())
            {
                $task = $this->tasks->dequeue();
                $task->send('Hello world !');
                if ($task->valid())
                {
                    $this->addTask($task);
                }
            }
        }
    }

    $taskRunner = new TaskRunner;

    function task1()
    {
        for ($i = 1; $i <= 2; $i++)
        {
            $data = yield;
            echo 'Task 1, run ', $i, ', value sent: ', $data, "\n";
        }
    }

    function task2()
    {
        for ($i = 1; $i <= 6; $i++)
        {
            $data = yield;
            echo 'Task 2, run ', $i, ', value sent: ', $data, "\n";
        }
    }

    function task3()
    {
        for ($i = 1; $i <= 4; $i++)
        {
            $data = yield;
            echo 'Task 3, run ', $i, ', value sent: ', $data, "\n";
        }
    }

    $taskRunner->addTask(task1());
    $taskRunner->addTask(task2());
    $taskRunner->addTask(task3());

    $taskRunner->run();
?>
```
***# Closures***
``` php
<?php
    function createAdd($quantity)
    {
        return function($nbr) use($quantity)
        {
            return $nbr + $quantity;
        };
    }

    $listeNbr = [1, 2, 3, 4, 5];

    $listeNbr = array_map(createAdd(5), $listeNbr);
    print_r(var_export($listeNbr, true));

    $listeNbr = array_map(createAdd(4), $listeNbr);
    print_r(var_export($listeNbr, true));
?>
<?php
    $add = function()
    {
        $this->_nbr += 5;
    };

    class SomeClass
    {
        private $_nbr = 0;

        public function nbr()
        {
            return $this->_nbr;
        }
    }

    $obj = new SomeClass;

    $add = $add->bindTo($obj, 'SomeClass');
    while($obj->nbr() < 100) {
        $add();
    }

    echo $obj->nbr() . "\n";
?>
<?php
    $add = function()
    {
        self::$_nbr += 5;
    };

    class SomeClass
    {
        private static $_nbr = 0;

        public static function nbr()
        {
            return self::$_nbr;
        }
    }

    $add = $add->bindTo(null, 'SomeClass');
    $add();

    echo SomeClass::nbr() . "\n";
?>
<?php
    class Number
    {
        private $_nbr;

        public function __construct($nbr)
        {
            $this->_nbr = $nbr;
        }
    }

    $closure = function() {
        echo var_export($this->_nbr + 5, true);
    };

    $val0 = new Number(-1);
    $val1 = new Number(-3);

    $closure->call($val0);
    $closure->call($val1);
    echo "\n";

?>
```
***# Observer***
``` php
<?php
    class Observed implements SplSubject
    {
        protected $name;
        protected $observers = [];

        public function attach(SplObserver $observer)
        {
            $this->observers[] = $observer;
            return $this;
        }

        public function detach(SplObserver $observer)
        {
            if (is_int($key = array_search($observer, $this->observers, true)))
            {
                unset($this->observers[$key]);
            }
        }

        public function notify()
        {
            foreach ($this->observers as $observer)
            {
                $observer->update($this);
            }
        }

        public function name()
        {
            return $this->name;
        }

        public function setName($name)
        {
            $this->name = $name;
            $this->notify();
        }
    }
    class Observer implements SplObserver
    {
        protected $name;
        protected $closure;

        public function __construct(Closure $closure, $name)
        {
            $this->closure = $closure->bindTo($this, $this);
            $this->name = $name;
        }

        public function update(SplSubject $subject)
        {
            $closure = $this->closure;
            $closure($subject);
        }
    }

    $o = new Observed;

    $observer1 = function(SplSubject $subject)
    {
        echo $this->name, ' notified ! new value for name : ', $subject->name(), "\n";
    };

    $observer2 = function(SplSubject $subject)
    {
        echo $this->name, ' notified ! new value for name : ', $subject->name(), "\n";
    };

    $o->attach(new Observer($observer1, 'First observer'))
      ->attach(new Observer($observer2, 'Second observer'));

    $o->setName('Victor');

?>

```
<br><br>

---
