# mysql shell

## create tables

- table `article`
    
```sql
    create table `article` (id int(4) not null primary key auto_increment, title varchar(30) not null unique, raw text not null, tags varchar(30), createdAt datetime, updatedAt datetime, summary varchar(50));`
```

- table `diary`

```sql
    create table `diary` (id int(4) not null primary key auto_increment, content text, createdAt datetime not null, updatedAt datetime not null, year int(4) not null, month int(2) not null, day int(2) not null, dateString varchar(20) not null unique, title varchar(40) not null);
```
