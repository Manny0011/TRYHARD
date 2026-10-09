# Allied Softech --- Technical Interview Deep-Dive

## Detailed Hinglish Answer Bank

**Target:** Fresher Software Developer / 4+ LPA

Har question ka format: **Core Answer → WHY / Concept Clarity →
Practical Example → Code/Example → Step-by-Step → Interview Follow-ups +
Answers → Common Mistakes → Mark as Learned**.

------------------------------------------------------------------------

## 1. What is OOPs?

**Category:** OOPs

### Core Answer --- Detailed Hinglish

OOPs (Object-Oriented Programming) ek programming approach hai jisme
software ko classes aur objects ke around design kiya jata hai. Object
ke andar data/properties aur related methods ko logically ek unit mein
rakha ja sakta hai. Iske four major pillars Encapsulation, Abstraction,
Inheritance aur Polymorphism hain.

### WHY / Concept Clarity

Large applications mein agar data aur logic random functions mein spread
ho, to maintenance difficult ho sakti hai. OOPs modularity, reuse aur
maintainability improve karta hai.

### Practical Example

Banking app mein `BankAccount` class ho sakti hai. Usme `balance` data
aur `deposit()` / `withdraw()` methods ho sakte hain. Har customer ka
account ek object ho sakta hai.

### Code / Example Where Required

``` cpp
class BankAccount {
private:
    double balance = 0;
public:
    void deposit(double amount) {
        if (amount > 0) balance += amount;
    }
};
```

### Step-by-Step Explanation

1.  Class blueprint define hoti hai.`\n2`{=tex}. Related state aur
    behaviour group hote hain.`\n3`{=tex}. Objects class ke instances
    hote hain.`\n4`{=tex}. Har object apni state maintain kar sakta hai.

### Interview Follow-ups + Answers

**Q: Four pillars?** Encapsulation, Abstraction, Inheritance,
Polymorphism.`\n`{=tex}`\n*`{=tex}\*Q: Class vs Object?\*\* Class
blueprint hai; object actual instance hai.`\n`{=tex}`\n*`{=tex}\*Q: OOPs
ka benefit?\*\* Reusability, modularity aur maintainability.

### Common Mistakes / Confusion

OOPs ko sirf four definitions tak limit mat karo. Real-world example
zaroor do.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 2. Encapsulation kya hai?

**Category:** OOPs

### Core Answer --- Detailed Hinglish

Encapsulation ka matlab data aur related methods ko ek class mein bundle
karna aur direct access ko control karna hai. Sensitive state ko private
rakhkar controlled public methods provide kiye ja sakte hain.

### WHY / Concept Clarity

Agar bank balance ko koi bhi code directly change kar sake, invalid
state create ho sakti hai. Encapsulation validation aur controlled
access provide karti hai.

### Practical Example

`balance` private rakho aur sirf `deposit()` / `withdraw()` ke through
change karo.

### Code / Example Where Required

``` cpp
class Account {
private:
    double balance = 0;
public:
    void deposit(double x) {
        if (x > 0) balance += x;
    }
    double getBalance() { return balance; }
};
```

### Step-by-Step Explanation

1.  Sensitive data identify karo.`\n2`{=tex}. Private/protected access
    use karo.`\n3`{=tex}. Public methods provide karo.`\n4`{=tex}.
    Methods validation/business rules apply kar sakti hain.

### Interview Follow-ups + Answers

**Q: Encapsulation kaise achieve?** Access modifiers +
methods.`\n`{=tex}`\n*`{=tex}\*Q: Encapsulation vs data hiding?\*\* Data
hiding encapsulation ka important part hai, but encapsulation broader
bundling + controlled access concept hai.

### Common Mistakes / Confusion

Encapsulation ko sirf 'private variables' bolkar stop mat karo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 3. Abstraction kya hai?

**Category:** OOPs

### Core Answer --- Detailed Hinglish

Abstraction ka matlab unnecessary implementation details hide karke user
ko required interface ya behaviour dikhana hai. User ko system ka 'what'
pata hota hai, har internal 'how' nahi.

### WHY / Concept Clarity

Complexity reduce karne ke liye. Large system mein har internal detail
expose karna user aur developer dono ke liye unnecessary complexity
create karta hai.

### Practical Example

ATM par user withdrawal select karta hai; backend mein account
validation, balance check aur transaction logging kaise hoti hai, user
ko nahi pata.

### Code / Example Where Required

``` cpp
class Payment {
public:
    virtual void pay(double amount) = 0;
};
```

### Step-by-Step Explanation

1.  Required behaviour identify.`\n2`{=tex}. Clear interface
    define.`\n3`{=tex}. Internal implementation hide.`\n4`{=tex}. User
    interface ke through feature use karta hai.

### Interview Follow-ups + Answers

**Q: Abstraction vs Encapsulation?** Abstraction unnecessary
complexity/implementation hide karti hai; encapsulation data + behaviour
bundle aur access control karti hai.

### Common Mistakes / Confusion

Abstraction ko simply 'data hiding' mat bolo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 4. Inheritance kya hai?

**Category:** OOPs

### Core Answer --- Detailed Hinglish

Inheritance mein derived class base class ke accessible behaviour ko
reuse ya extend kar sakti hai. Ye generally 'is-a' relationship
represent karta hai.

### WHY / Concept Clarity

Common functionality ko baar-baar duplicate karne ki jagah base class
mein rakha ja sakta hai, jisse reuse improve hota hai.

### Practical Example

`Car is a Vehicle`. Vehicle mein `start()` ho sakta hai; Car apna
`drive()` add kar sakti hai.

### Code / Example Where Required

``` cpp
class Vehicle {
public:
    void start() {}
};

class Car : public Vehicle {
public:
    void drive() {}
};
```

### Step-by-Step Explanation

1.  Common behaviour identify.`\n2`{=tex}. Base class
    define.`\n3`{=tex}. Child class inherit.`\n4`{=tex}. Child
    additional behaviour add/override kar sakti hai.

### Interview Follow-ups + Answers

**Q: Types?** Single, multilevel, multiple, hierarchical,
hybrid.`\n`{=tex}`\n*`{=tex}\*Q: Composition?\*\* 'has-a' relationship
ke liye often better choice.

### Common Mistakes / Confusion

Har code-reuse problem mein inheritance mat use karo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 5. Polymorphism kya hai?

**Category:** OOPs

### Core Answer --- Detailed Hinglish

Polymorphism ka meaning 'many forms' hai. Same interface/name different
situations mein different behaviour de sakta hai. Compile-time example
function overloading hai; runtime example virtual function overriding
hai.

### WHY / Concept Clarity

Common interface ke through different implementations use karne se code
flexible aur extensible banta hai.

### Practical Example

Payment system mein CardPayment, UpiPayment aur CashPayment ka `pay()`
behaviour alag ho sakta hai.

### Code / Example Where Required

``` cpp
class Animal {
public:
    virtual void sound() { cout << "Animal"; }
};

class Dog : public Animal {
public:
    void sound() override { cout << "Bark"; }
};
```

### Step-by-Step Explanation

1.  Common interface.`\n2`{=tex}. Different implementations.`\n3`{=tex}.
    Base pointer/reference actual object ko refer kar sakta
    hai.`\n4`{=tex}. Runtime dispatch actual implementation select kar
    sakta hai.

### Interview Follow-ups + Answers

**Q: Overloading?** Compile-time polymorphism.`\n`{=tex}`\n*`{=tex}\*Q:
Overriding?\*\* Derived class ka base virtual method replace karna.

### Common Mistakes / Confusion

Overloading aur overriding ko same mat samjho.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 6. Pointer vs Reference?

**Category:** C++

### Core Answer --- Detailed Hinglish

Pointer ek variable hai jo memory address store karta hai. Reference
existing object ka alias hota hai. Pointer null ho sakta hai aur
reassign ho sakta hai; reference ko normally valid object se bind kiya
jata hai.

### WHY / Concept Clarity

C++ memory, function arguments aur object manipulation samajhne ke liye
ye fundamental distinction hai.

### Practical Example

``` cpp
int x = 10;
int* p = &x;
int& r = x;
``` Here `p` address store karta hai, `*p` value access karta hai aur `r` x ka alternate name hai.

### Code / Example Where Required
```cpp
r = 20;
// x is now 20

*p = 30;
// x is now 30
```

### Step-by-Step Explanation

1.  `&x` address deta hai.`\n2`{=tex}. Pointer address store karta
    hai.`\n3`{=tex}. Dereference se value access hoti hai.`\n4`{=tex}.
    Reference directly same object ko represent karta hai.

### Interview Follow-ups + Answers

**Q: Pointer null ho sakta hai?** Yes.`\n`{=tex}`\n*`{=tex}\*Q:
Reference reassign?\*\* Normal reference binding change nahi
hoti.`\n`{=tex}`\n*`{=tex}\*Q: Pointer kab useful?\*\* Optional/null
state ya address-level manipulation.

### Common Mistakes / Confusion

Pointer aur reference ko completely identical mat bolo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 7. WHERE aur HAVING mein difference?

**Category:** SQL

### Core Answer --- Detailed Hinglish

`WHERE` individual rows ko filter karta hai. `HAVING` grouped/aggregate
results ko filter karta hai. Easy rule: **WHERE → rows, HAVING →
groups**.

### WHY / Concept Clarity

Aggregate condition jaise `COUNT(*) >= 5` group-level condition hai,
isliye HAVING use hota hai.

### Practical Example

Department-wise employee count nikalte waqt pehle salary se rows filter
karo, phir department group karo aur count ke basis par HAVING lagao.

### Code / Example Where Required

``` sql
SELECT department, COUNT(*) AS total
FROM employees
WHERE salary > 30000
GROUP BY department
HAVING COUNT(*) >= 5;
```

### Step-by-Step Explanation

1.  WHERE rows filter.`\n2`{=tex}. GROUP BY groups banata
    hai.`\n3`{=tex}. COUNT calculate hota hai.`\n4`{=tex}. HAVING groups
    filter karta hai.

### Interview Follow-ups + Answers

**Q: Aggregate WHERE mein?** Usually aggregate result ke liye
HAVING.`\n`{=tex}`\n*`{=tex}\*Q: GROUP BY?\*\* Similar values ko groups
mein organize karta hai.

### Common Mistakes / Confusion

WHERE aur HAVING ko interchangeable mat samjho.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 8. INNER JOIN vs LEFT JOIN?

**Category:** SQL

### Core Answer --- Detailed Hinglish

INNER JOIN sirf matching records return karta hai. LEFT JOIN left table
ke saare records preserve karta hai; right table ka matching record na
mile to right-side columns NULL ho sakte hain.

### WHY / Concept Clarity

Real applications mein related data multiple tables mein hota hai. JOIN
un relationships ko combined result mein laata hai.

### Practical Example

Employees aur Departments tables. Employee ka department missing ho to
LEFT JOIN employee ko still show kar sakta hai; INNER JOIN nahi.

### Code / Example Where Required

``` sql
SELECT e.name, d.name
FROM employees e
LEFT JOIN departments d
ON e.department_id = d.id;
```

### Step-by-Step Explanation

1.  Tables select.`\n2`{=tex}. Join condition define.`\n3`{=tex}.
    Matching records combine.`\n4`{=tex}. LEFT JOIN unmatched left
    records preserve karta hai.

### Interview Follow-ups + Answers

**Q: Many-to-many?** Junction/bridge table.`\n`{=tex}`\n*`{=tex}\*Q:
Join condition missing?\*\* Cartesian product ho sakta hai.

### Common Mistakes / Confusion

JOIN condition aur NULL behaviour clearly explain karo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 9. Second highest salary kaise find karoge?

**Category:** SQL

### Core Answer --- Detailed Hinglish

Second highest **distinct** salary find karne ke multiple valid
approaches hain. Interview mein duplicate highest salary ka edge case
mention karna strong answer hota hai.

### WHY / Concept Clarity

Real data mein highest salary multiple employees ki ho sakti hai. Isliye
second row aur second distinct salary different ho sakti hain.

### Practical Example

Agar salaries 100, 100, 80, 70 hain, second highest distinct salary 80
hai.

### Code / Example Where Required

``` sql
SELECT MAX(salary)
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);
```

### Step-by-Step Explanation

1.  Inner query highest salary find karti hai.`\n2`{=tex}. Smaller
    salaries filter hoti hain.`\n3`{=tex}. Outer MAX second distinct
    salary deta hai.`\n4`{=tex}. Agar second distinct salary nahi hai to
    NULL aa sakta hai.

### Interview Follow-ups + Answers

**Q: Third highest?** Similar subquery ya `DENSE_RANK()`
approach.`\n`{=tex}`\n*`{=tex}\*Q: Duplicate highest?\*\*
Distinct/ranking semantics discuss karo.

### Common Mistakes / Confusion

`ORDER BY ... LIMIT 2` ko blindly second distinct salary mat samjho.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 10. Primary Key vs Foreign Key?

**Category:** DBMS

### Core Answer --- Detailed Hinglish

Primary Key table ke record ko uniquely identify karti hai. Foreign Key
another table ki key ko reference karke relationship establish karti
hai.

### WHY / Concept Clarity

Relational databases ka core strength relationships aur referential
integrity hai.

### Practical Example

`departments.id` primary key ho sakta hai aur `employees.department_id`
usko reference kar sakta hai.

### Code / Example Where Required

``` sql
CREATE TABLE departments(
  id INT PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE employees(
  id INT PRIMARY KEY,
  department_id INT,
  FOREIGN KEY(department_id) REFERENCES departments(id)
);
```

### Step-by-Step Explanation

1.  Parent table key define.`\n2`{=tex}. Child table reference
    column.`\n3`{=tex}. Relationship establish.`\n4`{=tex}. Referential
    rules enforce ho sakte hain.

### Interview Follow-ups + Answers

**Q: Foreign key unique?** No. Many employees same department reference
kar sakte hain.`\n`{=tex}`\n*`{=tex}\*Q: Foreign key NULL?\*\* Column
constraints allow kare to possible.

### Common Mistakes / Confusion

Foreign Key ko unique key mat samjho.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 11. Normalization kya hai?

**Category:** DBMS

### Core Answer --- Detailed Hinglish

Normalization database design ka process hai jiska goal redundant data
reduce karna aur dependencies ko logically organize karna hai. Common
normal forms 1NF, 2NF aur 3NF hain.

### WHY / Concept Clarity

Repeated data update, insert aur delete anomalies create kar sakta hai.

### Practical Example

Har employee row mein department name repeat karne ke bajay separate
`Departments` table aur `department_id` relation use kiya ja sakta hai.

### Code / Example Where Required

``` text
Employees(id, name, department_id)
Departments(id, department_name)
```

### Step-by-Step Explanation

1.  Redundancy identify.`\n2`{=tex}. Entities separate.`\n3`{=tex}. Keys
    se relationships.`\n4`{=tex}. Dependencies analyze.`\n5`{=tex}.
    Suitable normal form target.

### Interview Follow-ups + Answers

**Q: 1NF?** Atomic values/no repeating groups.`\n`{=tex}`\n*`{=tex}\*Q:
2NF?\*\* 1NF + no partial dependency on composite
key.`\n`{=tex}`\n*`{=tex}\*Q: 3NF?\*\* 2NF + no transitive dependency in
classic formulation.

### Common Mistakes / Confusion

Normalization ka matlab simply more tables banana nahi hai.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 12. ACID properties kya hain?

**Category:** DBMS

### Core Answer --- Detailed Hinglish

ACID = Atomicity, Consistency, Isolation, Durability. Atomicity
all-or-nothing; Consistency valid state maintain; Isolation concurrent
transactions ke effects ko controlled rakhti hai; Durability committed
data ko recovery/failure ke baad preserve karne ka goal hai.

### WHY / Concept Clarity

Bank transfer mein debit aur credit dono reliable way se complete hone
chahiye; half transaction dangerous hai.

### Practical Example

Account A se ₹500 debit aur Account B mein ₹500 credit ek transaction ho
sakta hai.

### Code / Example Where Required

``` sql
BEGIN;
UPDATE accounts SET balance=balance-500 WHERE id=1;
UPDATE accounts SET balance=balance+500 WHERE id=2;
COMMIT;
```

### Step-by-Step Explanation

1.  Transaction begin.`\n2`{=tex}. Related operations.`\n3`{=tex}.
    Success → commit.`\n4`{=tex}. Failure → rollback.`\n5`{=tex}.
    Recovery mechanisms durability support karte hain.

### Interview Follow-ups + Answers

**Q: Isolation levels?** Read Uncommitted, Read Committed, Repeatable
Read, Serializable; exact details DB-specific.`\n`{=tex}`\n*`{=tex}\*Q:
Rollback?\*\* Transaction changes undo karne ka mechanism.

### Common Mistakes / Confusion

Sirf four full forms bolkar stop mat karo; practical example do.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 13. Process vs Thread?

**Category:** OS

### Core Answer --- Detailed Hinglish

Process ek execution context hai jiske paas apna address space/resources
ho sakte hain. Thread process ke andar execution unit hai aur process ke
resources share kar sakta hai.

### WHY / Concept Clarity

Concurrency mein process isolation aur thread-level shared memory ke
trade-offs important hain.

### Practical Example

Server multiple threads se requests handle kar sakta hai. Separate
processes stronger isolation provide kar sakte hain.

### Code / Example Where Required

``` text
Process
 ├── Thread 1
 ├── Thread 2
 └── Thread 3
```

### Step-by-Step Explanation

1.  Process exists.`\n2`{=tex}. Threads uske andar execute.`\n3`{=tex}.
    Shared resources accessible.`\n4`{=tex}. Shared state ke liye
    synchronization required ho sakta hai.

### Interview Follow-ups + Answers

**Q: Thread lightweight?** Often process se less setup, but exact cost
OS-dependent.`\n`{=tex}`\n*`{=tex}\*Q: Risks?\*\* Race conditions,
deadlocks, synchronization complexity.

### Common Mistakes / Confusion

Thread ko exactly 'mini process' mat bolo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 14. Virtual Memory kya hai?

**Category:** OS

### Core Answer --- Detailed Hinglish

Virtual memory process ko virtual address space provide karti hai, jise
OS aur hardware physical memory se map karte hain. Paging common
memory-management technique hai.

### WHY / Concept Clarity

RAM limited hoti hai. Virtual memory process isolation aur flexible
memory management provide karti hai.

### Practical Example

Agar required page RAM mein resident nahi hai, page fault ho sakta hai
aur OS page ko backing storage se load kar sakta hai.

### Code / Example Where Required

``` text
Virtual Address
      ↓
 Page Table / MMU
      ↓
Physical Memory
```

### Step-by-Step Explanation

1.  Process virtual address use karta hai.`\n2`{=tex}. Mapping check
    hoti hai.`\n3`{=tex}. Resident page → access.`\n4`{=tex}. Missing
    page → page fault.`\n5`{=tex}. OS page handling karta hai.

### Interview Follow-ups + Answers

**Q: Page fault?** Required page currently resident
nahi.`\n`{=tex}`\n*`{=tex}\*Q: Excessive paging?\*\* Performance
severely degrade ho sakti hai.

### Common Mistakes / Confusion

Virtual memory ko simply 'extra RAM' mat bolo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 15. OSI Model kya hai?

**Category:** Networking

### Core Answer --- Detailed Hinglish

OSI networking ko seven conceptual layers mein divide karta hai:
Physical, Data Link, Network, Transport, Session, Presentation,
Application.

### WHY / Concept Clarity

Layering networking responsibilities ko modular way mein samajhne aur
troubleshooting mein help karti hai.

### Practical Example

Physical = signals/cables; Data Link = frames/MAC; Network = IP/routing;
Transport = TCP/UDP; Application = HTTP/DNS.

### Code / Example Where Required

``` text
7 Application
6 Presentation
5 Session
4 Transport
3 Network
2 Data Link
1 Physical
```

### Step-by-Step Explanation

1.  Sender data encapsulate karta hai.`\n2`{=tex}. Network
    transmission.`\n3`{=tex}. Receiver decapsulation karta
    hai.`\n4`{=tex}. Application data receive karti hai.

### Interview Follow-ups + Answers

**Q: Router?** Traditionally Network layer.`\n`{=tex}`\n*`{=tex}\*Q:
Switch?\*\* Traditional Layer-2 association.`\n`{=tex}`\n*`{=tex}\*Q:
TCP?\*\* Transport layer.

### Common Mistakes / Confusion

OSI aur TCP/IP ko exact one-to-one mapping mat bolo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 16. TCP vs UDP?

**Category:** Networking

### Core Answer --- Detailed Hinglish

TCP connection-oriented reliable ordered byte-stream transport provide
karta hai. UDP connectionless datagram transport hai without TCP-like
delivery/order guarantees.

### WHY / Concept Clarity

Application requirements different hoti hain. Reliable delivery
important ho to TCP-like transport useful; low-overhead/real-time use
cases UDP-based protocols use kar sakte hain.

### Practical Example

File transfer mein reliability important ho sakti hai; real-time
media/gaming mein latency more important ho sakti hai.

### Code / Example Where Required

``` text
TCP → reliable + ordered
UDP → datagram + lightweight guarantees
```

### Step-by-Step Explanation

1.  Application requirements identify.`\n2`{=tex}. Reliability/order
    need check.`\n3`{=tex}. Latency/overhead trade-off.`\n4`{=tex}.
    Appropriate protocol choose.

### Interview Follow-ups + Answers

**Q: UDP useless?** No. DNS and many real-time protocols use
UDP.`\n`{=tex}`\n*`{=tex}\*Q: TCP handshake?\*\* Traditional three-way
handshake.

### Common Mistakes / Confusion

UDP = always faster ko absolute rule mat bolo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 17. DNS kya hai?

**Category:** Networking

### Core Answer --- Detailed Hinglish

DNS (Domain Name System) ek distributed naming system hai jo domain
names ko IP addresses aur other DNS records se resolve karta hai.

### WHY / Concept Clarity

Hum domain names easily remember karte hain; network connection ke liye
address information required hoti hai.

### Practical Example

Browser `example.com` type karta hai → DNS resolution → IP information →
server connection.

### Code / Example Where Required

``` text
Domain → DNS → IP → Connection
```

### Step-by-Step Explanation

1.  Browser/OS cache check ho sakta hai.`\n2`{=tex}. Resolver
    query.`\n3`{=tex}. DNS hierarchy/authoritative source
    involved.`\n4`{=tex}. Response cache.`\n5`{=tex}. Client address use
    karta hai.

### Interview Follow-ups + Answers

**Q: Records?** A, AAAA, CNAME, MX, TXT.`\n`{=tex}`\n*`{=tex}\*Q: DNS vs
DHCP?\*\* DNS name resolution; DHCP network configuration.

### Common Mistakes / Confusion

DNS ko single global server mat bolo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 18. HTTP vs HTTPS?

**Category:** Networking

### Core Answer --- Detailed Hinglish

HTTP web request/response protocol hai. HTTPS HTTP ko TLS-secured
channel par run karta hai, providing confidentiality, integrity aur
server-authentication support.

### WHY / Concept Clarity

Login, session aur sensitive data ko network interception se protect
karna important hai.

### Practical Example

Browser HTTPS request karta hai → TLS negotiation/certificate validation
→ encrypted HTTP messages exchange.

### Code / Example Where Required

``` text
Client → TLS secure channel → Server
                 🔒
              HTTP data
```

### Step-by-Step Explanation

1.  Connection establish.`\n2`{=tex}. TLS negotiation.`\n3`{=tex}.
    Certificate/authentication checks.`\n4`{=tex}. Secure HTTP exchange.

### Interview Follow-ups + Answers

**Q: Common ports?** HTTP 80, HTTPS 443.`\n`{=tex}`\n*`{=tex}\*Q: HTTPS
enough for security?\*\* No. Authorization, input validation and secure
coding still required.

### Common Mistakes / Confusion

HTTPS ko sirf 'encryption' bolkar stop mat karo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 19. var, let aur const mein difference?

**Category:** JavaScript

### Core Answer --- Detailed Hinglish

`var` function-scoped hota hai. `let` aur `const` block-scoped hain.
`const` binding ko reassign nahi kar sakte, although object contents
necessarily immutable nahi hote.

### WHY / Concept Clarity

Scope bugs aur accidental reassignment control karne ke liye correct
declaration important hai.

### Practical Example

``` js
let count = 1;
count = 2;
const user = {name: 'A'};
user.name = 'B';
```

### Code / Example Where Required

`const user` ko reassign nahi kar sakte, but object ke property ko
mutate kar sakte hain.

### Step-by-Step Explanation

1.  `let` block scope.`\n2`{=tex}. `const` block scope.`\n3`{=tex}.
    `const` binding fixed.`\n4`{=tex}. Object internals still mutable ho
    sakte hain.

### Interview Follow-ups + Answers

**Q: const object immutable?** No. Binding constant
hai.`\n`{=tex}`\n*`{=tex}\*Q: var scope?\*\* Function scope.

### Common Mistakes / Confusion

`const` ko complete immutability mat bolo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 20. Closure kya hota hai?

**Category:** JavaScript

### Core Answer --- Detailed Hinglish

Closure tab hota hai jab function apne surrounding lexical scope ke
variables ko remember/access karta hai, even after outer function
execution complete ho chuki ho.

### WHY / Concept Clarity

Closures private state, callbacks, factories aur event handlers mein
useful hain.

### Practical Example

``` js
function counter(){
  let n=0;
  return ()=>++n;
}
const c=counter();
c(); // 1
c(); // 2
```

### Code / Example Where Required

Returned function `n` ko preserve access deta hai. Isliye repeated calls
same state ko update karte hain.

### Step-by-Step Explanation

1.  Outer function runs.`\n2`{=tex}. Variable create.`\n3`{=tex}. Inner
    function return.`\n4`{=tex}. Outer finishes.`\n5`{=tex}. Inner
    function lexical variable access karta rehta hai.

### Interview Follow-ups + Answers

**Q: Uses?** Private state, callbacks, factories,
memoization.`\n`{=tex}`\n*`{=tex}\*Q: Memory issue?\*\* Long-lived
closures referenced data ko alive rakh sakte hain.

### Common Mistakes / Confusion

Closure ko simply 'function inside function' mat bolo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 21. Promise aur async/await kya hain?

**Category:** JavaScript

### Core Answer --- Detailed Hinglish

Promise future asynchronous result ko represent karta hai: pending,
fulfilled ya rejected. `async/await` Promise-based asynchronous code ko
readable syntax deta hai.

### WHY / Concept Clarity

API calls aur other asynchronous operations ko cleanly handle karna
easier hota hai.

### Practical Example

``` js
async function getUser(){
  const r = await fetch('/api/user');
  return r.json();
}
```

### Code / Example Where Required

`await` Promise result ke continuation ko express karta hai; async
function khud Promise return karti hai.

### Step-by-Step Explanation

1.  Async function Promise return.`\n2`{=tex}. await Promise result ka
    wait-like syntax.`\n3`{=tex}. Continuation later resume hoti
    hai.`\n4`{=tex}. Errors catch/handle kiye ja sakte hain.

### Interview Follow-ups + Answers

**Q: Promise states?** Pending, fulfilled,
rejected.`\n`{=tex}`\n*`{=tex}\*Q: await blocking?\*\* It does not turn
asynchronous I/O into traditional blocking execution.

### Common Mistakes / Confusion

`await` ko synchronous blocking operation mat bolo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 22. Constructor aur Destructor kya hote hain?

**Category:** OOPs

### Core Answer --- Detailed Hinglish

Constructor object create hote waqt initialization/setup ke liye call
hota hai. Destructor object lifetime end hone par cleanup ke liye use
hota hai. C++ mein destructor ka syntax `~ClassName()` hota hai.

### WHY / Concept Clarity

Object ko valid initial state dena aur owned resources ko lifetime ke
end par clean karna important hai.

### Practical Example

``` cpp
class File {
public:
    File() { /* setup */ }
    ~File() { /* cleanup */ }
};
```

### Code / Example Where Required

``` cpp
class File {
public:
    File() { /* setup */ }
    ~File() { /* cleanup */ }
};
```

### Step-by-Step Explanation

1.  Object create hota hai.`\n2`{=tex}. Constructor run hota
    hai.`\n3`{=tex}. Object use hota hai.`\n4`{=tex}. Lifetime end hoti
    hai.`\n5`{=tex}. Destructor cleanup karta hai.

### Interview Follow-ups + Answers

**Q: Constructor return type?** No.`\n`{=tex}`\n*`{=tex}\*Q: Destructor
arguments?\*\* No.`\n`{=tex}`\n*`{=tex}\*Q: Constructor overload ho
sakta hai?\*\* Yes.

### Common Mistakes / Confusion

Destructor ka purpose sirf `delete` karna nahi; resource cleanup broader
concept hai.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 23. Overloading vs Overriding?

**Category:** OOPs

### Core Answer --- Detailed Hinglish

Overloading mein same function name different parameter lists ke saath
multiple versions ho sakte hain. Overriding mein derived class inherited
method ko same interface/signature ke saath apne behaviour se implement
karti hai.

### WHY / Concept Clarity

Interviewers is comparison se compile-time vs runtime polymorphism check
karte hain.

### Practical Example

``` cpp
void print(int);
void print(string); // overloading

class Dog : public Animal {
    void sound() override;
};
```

### Code / Example Where Required

``` cpp
void print(int);
void print(string); // overloading

class Dog : public Animal {
    void sound() override;
};
```

### Step-by-Step Explanation

1.  Parameter list different → overloading.`\n2`{=tex}. Parent-child
    relation + same virtual method → overriding.`\n3`{=tex}. Overloading
    compile-time selection; overriding runtime dispatch context.

### Interview Follow-ups + Answers

**Q: Inheritance required for overriding?**
Yes.`\n`{=tex}`\n*`{=tex}\*Q: `override` keyword?\*\* Intended
overriding verify karne mein compiler help karta hai.

### Common Mistakes / Confusion

Return type alone change karke overloading nahi hoti.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 24. Composition vs Inheritance?

**Category:** OOPs

### Core Answer --- Detailed Hinglish

Composition 'has-a' relationship represent karti hai: ek class ke paas
doosri class ka object/member hota hai. Inheritance 'is-a' relationship
represent karti hai.

### WHY / Concept Clarity

Composition often loose coupling aur flexible design de sakti hai, while
inheritance strong hierarchy create karti hai.

### Practical Example

``` cpp
class Engine {};
class Car {
    Engine engine; // Car has an Engine
};
```

### Code / Example Where Required

``` cpp
class Engine {};
class Car {
    Engine engine; // Car has an Engine
};
```

### Step-by-Step Explanation

1.  Relationship identify.`\n2`{=tex}. Is-a ho to inheritance
    consider.`\n3`{=tex}. Has-a ho to composition consider.`\n4`{=tex}.
    Reuse ke liye unnecessary inheritance avoid karo.

### Interview Follow-ups + Answers

**Q: Prefer composition or inheritance?** Many designs mein composition
is safer/flexible, but requirement par depend karta hai.

### Common Mistakes / Confusion

Har reuse ko inheritance se solve mat karo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 25. Shallow Copy vs Deep Copy?

**Category:** C++

### Core Answer --- Detailed Hinglish

Shallow copy member values copy karti hai; pointer/resource member ho to
same underlying resource reference ho sakta hai. Deep copy independent
resource create karti hai.

### WHY / Concept Clarity

Resource-owning classes mein shallow copy double-free, shared mutation
ya dangling pointer issues create kar sakti hai.

### Practical Example

``` cpp
// Concept
A a;
A b = a; // copy semantics depend on class
```

### Code / Example Where Required

``` cpp
// Concept
A a;
A b = a; // copy semantics depend on class
```

### Step-by-Step Explanation

1.  Object has resource.`\n2`{=tex}. Copy requested.`\n3`{=tex}. Shallow
    → address/reference copied.`\n4`{=tex}. Deep → new resource +
    content copied.

### Interview Follow-ups + Answers

**Q: Modern C++ solution?** RAII, smart pointers, proper copy/move
semantics.

### Common Mistakes / Confusion

Raw pointer dekhte hi deep copy assume mat karo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 26. Smart Pointer kya hai?

**Category:** C++

### Core Answer --- Detailed Hinglish

Smart pointers ownership ko automatically manage karne ke liye RAII use
karte hain. Common types `unique_ptr`, `shared_ptr`, aur `weak_ptr`
hain.

### WHY / Concept Clarity

Manual `new/delete` errors reduce karne ke liye smart pointers safer
ownership model provide karte hain.

### Practical Example

``` cpp
#include <memory>
auto p = std::make_unique<int>(10);
```

### Code / Example Where Required

``` cpp
#include <memory>
auto p = std::make_unique<int>(10);
```

### Step-by-Step Explanation

1.  Ownership define.`\n2`{=tex}. Smart pointer resource own karta
    hai.`\n3`{=tex}. Scope/lifetime end par cleanup
    automatic.`\n4`{=tex}. `shared_ptr` reference counting use kar sakta
    hai.

### Interview Follow-ups + Answers

**Q: unique_ptr?** Exclusive ownership.`\n`{=tex}`\n*`{=tex}\*Q:
shared_ptr?\*\* Shared ownership/reference
counting.`\n`{=tex}`\n*`{=tex}\*Q: weak_ptr?\*\* Non-owning reference,
cycles break karne mein useful.

### Common Mistakes / Confusion

Har object ko `shared_ptr` banana overengineering ho sakta hai.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 27. STL kya hai?

**Category:** C++

### Core Answer --- Detailed Hinglish

STL (Standard Template Library) C++ standard library ka important part
hai jo containers, algorithms, iterators aur related utilities provide
karta hai.

### WHY / Concept Clarity

Interview coding mein efficient implementation ke liye STL extremely
useful hai.

### Practical Example

``` cpp
vector<int> a = {3,1,2};
sort(a.begin(), a.end());
```

### Code / Example Where Required

``` cpp
vector<int> a = {3,1,2};
sort(a.begin(), a.end());
```

### Step-by-Step Explanation

1.  Container choose.`\n2`{=tex}. Data store.`\n3`{=tex}. Iterator/range
    provide.`\n4`{=tex}. Standard algorithm apply.

### Interview Follow-ups + Answers

**Q: Common containers?** vector, deque, list, stack, queue, set, map,
unordered_set, unordered_map.

### Common Mistakes / Confusion

STL use karna aur complexity samajhna dono zaroori hain.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 28. Vector vs Array?

**Category:** C++

### Core Answer --- Detailed Hinglish

C-style array fixed-size contiguous collection hota hai. `vector`
dynamic-size standard container hai jo elements ko contiguous memory
mein maintain karta hai.

### WHY / Concept Clarity

Unknown/dynamic number of elements ke liye vector convenient hai.

### Practical Example

``` cpp
int a[5];
vector<int> v;
v.push_back(10);
```

### Code / Example Where Required

``` cpp
int a[5];
vector<int> v;
v.push_back(10);
```

### Step-by-Step Explanation

1.  Fixed size known → array possible.`\n2`{=tex}. Dynamic size →
    vector.`\n3`{=tex}. Vector capacity grow kar sakti hai.`\n4`{=tex}.
    Random access O(1) typically.

### Interview Follow-ups + Answers

**Q: vector push_back complexity?** Amortized
O(1).`\n`{=tex}`\n*`{=tex}\*Q: vector contiguous?\*\* Yes, standard
vector elements contiguous storage use karta hai.

### Common Mistakes / Confusion

Vector ko linked list jaisa mat samjho.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 29. Map vs Unordered_map?

**Category:** C++

### Core Answer --- Detailed Hinglish

`map` typically ordered associative container hai with O(log n)
lookup/insert/erase. `unordered_map` hash table based hota hai with
average O(1) lookup/insert/erase, worst-case O(n).

### WHY / Concept Clarity

Choice ordering requirement aur performance trade-off par depend karti
hai.

### Practical Example

``` cpp
map<string,int> m;
unordered_map<string,int> u;
```

### Code / Example Where Required

``` cpp
map<string,int> m;
unordered_map<string,int> u;
```

### Step-by-Step Explanation

1.  Ordering required? map.`\n2`{=tex}. Fast average key lookup and no
    ordering? unordered_map.`\n3`{=tex}. Hashing overhead/collision
    behaviour consider.

### Interview Follow-ups + Answers

**Q: map implementation?** Commonly balanced
tree.`\n`{=tex}`\n*`{=tex}\*Q: unordered_map worst case?\*\* O(n).

### Common Mistakes / Confusion

Unordered_map ko guaranteed O(1) mat bolo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 30. Time Complexity kya hai?

**Category:** DSA

### Core Answer --- Detailed Hinglish

Time complexity input size badhne par algorithm ke running work ke
growth ko describe karti hai. Common notation Big-O hai.

### WHY / Concept Clarity

Interview mein solution choose karne aur constraints ke according
optimize karne ke liye complexity important hai.

### Practical Example

``` text
Linear search → O(n)
Binary search → O(log n)
Nested loops → often O(n²)
```

### Code / Example Where Required

``` text
Linear search → O(n)
Binary search → O(log n)
Nested loops → often O(n²)
```

### Step-by-Step Explanation

1.  Input size n identify.`\n2`{=tex}. Dominant operations
    count.`\n3`{=tex}. Constants/lower-order terms ignore in
    Big-O.`\n4`{=tex}. Worst/average/best case context mention if
    relevant.

### Interview Follow-ups + Answers

**Q: O(2n)?** O(n).`\n`{=tex}`\n*`{=tex}\*Q: O(n)+O(n²)?\*\* O(n²).

### Common Mistakes / Confusion

Exact seconds ko Big-O mat samjho.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 31. Binary Search kab use karoge?

**Category:** DSA

### Core Answer --- Detailed Hinglish

Binary search sorted/monotonic search space mein target locate karne ke
liye use hota hai. Har step search space roughly half karta hai.

### WHY / Concept Clarity

Agar data sorted hai aur direct scan O(n) se better search possible hai,
binary search O(log n) de sakta hai.

### Practical Example

``` js
let l=0,r=a.length-1;
while(l<=r){
  const mid=Math.floor(l+(r-l)/2);
  if(a[mid]===x) return mid;
  if(a[mid]<x) l=mid+1;
  else r=mid-1;
}
```

### Code / Example Where Required

``` js
let l=0,r=a.length-1;
while(l<=r){
  const mid=Math.floor(l+(r-l)/2);
  if(a[mid]===x) return mid;
  if(a[mid]<x) l=mid+1;
  else r=mid-1;
}
```

### Step-by-Step Explanation

1.  Sorted/monotonic property verify.`\n2`{=tex}. `l`, `r`
    define.`\n3`{=tex}. `mid` calculate safely.`\n4`{=tex}.
    Compare.`\n5`{=tex}. Half eliminate.`\n6`{=tex}. Repeat.

### Interview Follow-ups + Answers

**Q: Complexity?** O(log n) time, O(1) iterative
space.`\n`{=tex}`\n*`{=tex}\*Q: Unsorted array?\*\* Normal binary search
directly valid nahi.

### Common Mistakes / Confusion

Sorted/monotonic condition verify kiye bina binary search mat lagao.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 32. Two Pointer pattern kya hai?

**Category:** DSA

### Core Answer --- Detailed Hinglish

Two pointers mein usually two indices maintain karke array/string ko
efficiently process kiya jata hai. Commonly sorted arrays, opposite
ends, ya slow/fast movement mein use hota hai.

### WHY / Concept Clarity

Repeated nested scanning ko reduce kar sakta hai.

### Practical Example

``` text
[1,2,3,4,6,8]
 L          R
```

### Code / Example Where Required

``` text
[1,2,3,4,6,8]
 L          R
```

### Step-by-Step Explanation

1.  Pointer roles define.`\n2`{=tex}. Condition ke according pointer
    move.`\n3`{=tex}. Har element ko unnecessary repeat scanning se
    bachao.`\n4`{=tex}. Often O(n) solution milta hai.

### Interview Follow-ups + Answers

**Q: Example?** Pair sum in sorted array, palindrome check, remove
duplicates, partition-style problems.

### Common Mistakes / Confusion

Pattern ko sirf 'two variables' mat bolo; pointer movement ka invariant
samjho.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 33. Sliding Window kya hai?

**Category:** DSA

### Core Answer --- Detailed Hinglish

Sliding Window contiguous subarray/substring ke problems mein current
window maintain karke left/right pointers move karta hai. Isse repeated
subarray work reduce hota hai.

### WHY / Concept Clarity

Keywords: longest/shortest subarray or substring, contiguous range, at
most/exactly K often signal this pattern.

### Practical Example

``` text
[2,1,5,1,3,2]
 L----R
```

### Code / Example Where Required

``` text
[2,1,5,1,3,2]
 L----R
```

### Step-by-Step Explanation

1.  Window define.`\n2`{=tex}. Right expand.`\n3`{=tex}. Condition
    maintain.`\n4`{=tex}. Invalid ho to left shrink.`\n5`{=tex}. Best
    answer update.

### Interview Follow-ups + Answers

**Q: Complexity?** Often O(n) because each pointer moves forward limited
times.

### Common Mistakes / Confusion

Every substring problem sliding window nahi; condition and contiguous
nature check karo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 34. Hashing kab use karoge?

**Category:** DSA

### Core Answer --- Detailed Hinglish

Hash map/set key-based fast average lookup provide karta hai. Frequency
counting, duplicate detection, complement lookup aur visited-state
problems mein common hai.

### WHY / Concept Clarity

Nested search ko average O(1) lookup se optimize kiya ja sakta hai.

### Practical Example

``` js
const freq = new Map();
for (const x of arr) {
  freq.set(x, (freq.get(x)||0)+1);
}
```

### Code / Example Where Required

``` js
const freq = new Map();
for (const x of arr) {
  freq.set(x, (freq.get(x)||0)+1);
}
```

### Step-by-Step Explanation

1.  Required lookup relation identify.`\n2`{=tex}. Key
    choose.`\n3`{=tex}. Store/search.`\n4`{=tex}. Average O(1) lookup
    expected in hash table.

### Interview Follow-ups + Answers

**Q: Trade-off?** Extra O(n) space.`\n`{=tex}`\n*`{=tex}\*Q: Set vs
Map?\*\* Set values/membership; Map key-value relation.

### Common Mistakes / Confusion

Hashing ki O(1) ko absolute guarantee mat bolo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 35. Recursion kya hai?

**Category:** DSA

### Core Answer --- Detailed Hinglish

Recursion mein function problem ke smaller version ko solve karne ke
liye khud ko call karta hai. Base case recursion ko stop karta hai.

### WHY / Concept Clarity

Tree traversal, divide-and-conquer aur backtracking mein natural fit
hai.

### Practical Example

``` js
function fact(n){
  if(n<=1) return 1;
  return n*fact(n-1);
}
```

### Code / Example Where Required

``` js
function fact(n){
  if(n<=1) return 1;
  return n*fact(n-1);
}
```

### Step-by-Step Explanation

1.  Base case define.`\n2`{=tex}. Problem smaller input mein
    reduce.`\n3`{=tex}. Recursive call.`\n4`{=tex}. Calls return hote
    hue answer build.

### Interview Follow-ups + Answers

**Q: Missing base case?** Infinite recursion/stack
overflow.`\n`{=tex}`\n*`{=tex}\*Q: Space?\*\* Call stack depth ke
according extra space.

### Common Mistakes / Confusion

Recursion ko iteration se always better mat bolo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 36. Stack vs Queue?

**Category:** DSA

### Core Answer --- Detailed Hinglish

Stack LIFO (Last In, First Out) structure hai; Queue FIFO (First In,
First Out) structure hai.

### WHY / Concept Clarity

Different order of processing different problems solve karta hai.

### Practical Example

``` text
Stack: push → [3,2,1] → pop 1
Queue: enqueue → [1,2,3] → dequeue 1
```

### Code / Example Where Required

``` text
Stack: push → [3,2,1] → pop 1
Queue: enqueue → [1,2,3] → dequeue 1
```

### Step-by-Step Explanation

1.  Required order identify.`\n2`{=tex}. LIFO → stack.`\n3`{=tex}. FIFO
    → queue.`\n4`{=tex}. Operations choose.

### Interview Follow-ups + Answers

**Q: Stack use?** Function calls, undo,
parentheses.`\n`{=tex}`\n*`{=tex}\*Q: Queue use?\*\* Scheduling, BFS,
producer-consumer patterns.

### Common Mistakes / Confusion

Stack/queue ko arrays only mat samjho; abstract data types hain.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 37. Transaction kya hoti hai?

**Category:** DBMS

### Core Answer --- Detailed Hinglish

Transaction related database operations ka logical unit hai jo together
commit ya rollback kiya ja sakta hai.

### WHY / Concept Clarity

Business operation multiple SQL statements ka combination ho sakta hai;
partial success inconsistency create kar sakta hai.

### Practical Example

``` sql
BEGIN;
UPDATE accounts SET balance=balance-1000 WHERE id=1;
UPDATE accounts SET balance=balance+1000 WHERE id=2;
COMMIT;
```

### Code / Example Where Required

``` sql
BEGIN;
UPDATE accounts SET balance=balance-1000 WHERE id=1;
UPDATE accounts SET balance=balance+1000 WHERE id=2;
COMMIT;
```

### Step-by-Step Explanation

1.  Begin.`\n2`{=tex}. Statements execute.`\n3`{=tex}. Success →
    commit.`\n4`{=tex}. Failure → rollback.

### Interview Follow-ups + Answers

**Q: COMMIT?** Changes finalize.`\n`{=tex}`\n*`{=tex}\*Q: ROLLBACK?\*\*
Transaction changes undo.

### Common Mistakes / Confusion

Transaction ko single query mat samjho.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 38. Deadlock kya hai?

**Category:** DBMS

### Core Answer --- Detailed Hinglish

Deadlock mein two or more transactions/processes resources hold karke ek
doosre ke resources ka wait karte hain, creating circular waiting.

### WHY / Concept Clarity

Locks consistency protect karte hain, but wrong lock ordering progress
block kar sakti hai.

### Practical Example

``` text
T1: holds A → waits B
T2: holds B → waits A
```

### Code / Example Where Required

``` text
T1: holds A → waits B
T2: holds B → waits A
```

### Step-by-Step Explanation

1.  Resources lock.`\n2`{=tex}. Each process holds
    something.`\n3`{=tex}. Each waits for another.`\n4`{=tex}. Circular
    wait creates deadlock.

### Interview Follow-ups + Answers

**Q: Avoid?** Consistent lock order, short transactions,
timeout/detection.`\n`{=tex}`\n*`{=tex}\*Q: Starvation?\*\* Repeatedly
resource access na milna; deadlock se different.

### Common Mistakes / Confusion

Deadlock ko normal waiting mat bolo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 39. Index ke disadvantages?

**Category:** DBMS

### Core Answer --- Detailed Hinglish

Indexes reads ko accelerate kar sakte hain but extra storage consume
karte hain aur INSERT/UPDATE/DELETE operations par maintenance cost add
karte hain.

### WHY / Concept Clarity

Isliye indexes query workload ke basis par design hone chahiye.

### Practical Example

``` sql
CREATE INDEX idx_email ON users(email);
```

### Code / Example Where Required

``` sql
CREATE INDEX idx_email ON users(email);
```

### Step-by-Step Explanation

1.  Read pattern identify.`\n2`{=tex}. Index add.`\n3`{=tex}. Query plan
    inspect.`\n4`{=tex}. Write/storage cost evaluate.

### Interview Follow-ups + Answers

**Q: Composite index?** Multiple columns.`\n`{=tex}`\n*`{=tex}\*Q: Too
many indexes?\*\* Writes/storage/maintenance overhead.

### Common Mistakes / Confusion

Har column par index banana wrong approach hai.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 40. Mutex vs Semaphore?

**Category:** OS

### Core Answer --- Detailed Hinglish

Mutex mutual exclusion/ownership-oriented lock hai. Semaphore
count/permit-based synchronization primitive hai. Binary semaphore kuch
cases mein mutex jaisa lag sakta hai, but semantics identical nahi.

### WHY / Concept Clarity

Shared resources aur coordination ke liye synchronization primitives
important hain.

### Practical Example

``` text
lock → critical section → unlock
```

### Code / Example Where Required

``` text
lock → critical section → unlock
```

### Step-by-Step Explanation

1.  Critical resource identify.`\n2`{=tex}. Primitive
    choose.`\n3`{=tex}. Acquire/wait.`\n4`{=tex}. Work.`\n5`{=tex}.
    Release/signal.

### Interview Follow-ups + Answers

**Q: Mutex ownership?** Generally locking thread ownership semantics
rakhta hai.`\n`{=tex}`\n*`{=tex}\*Q: Semaphore?\*\* Counted permits
coordinate kar sakta hai.

### Common Mistakes / Confusion

Synchronization primitive use karna deadlock automatically prevent nahi
karta.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 41. Context Switch kya hai?

**Category:** OS

### Core Answer --- Detailed Hinglish

Context switch mein CPU ek executing process/thread ka state save karke
doosre execution context ka state restore karta hai.

### WHY / Concept Clarity

Multitasking/concurrency possible hoti hai, but switching overhead bhi
hota hai.

### Practical Example

``` text
Thread A → save state → Thread B
Thread B → save state → Thread C
```

### Code / Example Where Required

``` text
Thread A → save state → Thread B
Thread B → save state → Thread C
```

### Step-by-Step Explanation

1.  Current state save.`\n2`{=tex}. Scheduler next context
    select.`\n3`{=tex}. Next state restore.`\n4`{=tex}. Execution
    resume.

### Interview Follow-ups + Answers

**Q: Too many switches?** Overhead increase.`\n`{=tex}`\n*`{=tex}\*Q:
Context switch process vs thread?\*\* Process switch can involve more
address-space/resource state; exact cost OS/hardware dependent.

### Common Mistakes / Confusion

Context switch ko 'CPU permanently changes program' mat bolo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 42. TCP Three-Way Handshake?

**Category:** Networking

### Core Answer --- Detailed Hinglish

TCP connection establish karne ke liye commonly SYN, SYN-ACK, ACK
exchange hota hai. Isse both sides initial sequence information
establish/confirm karte hain.

### WHY / Concept Clarity

Reliable connection-oriented communication start karne se pehle state
synchronization needed hoti hai.

### Practical Example

``` text
Client  → SYN → Server
Client  ← SYN-ACK ← Server
Client  → ACK → Server
```

### Code / Example Where Required

``` text
Client  → SYN → Server
Client  ← SYN-ACK ← Server
Client  → ACK → Server
```

### Step-by-Step Explanation

1.  Client SYN.`\n2`{=tex}. Server SYN-ACK.`\n3`{=tex}. Client
    ACK.`\n4`{=tex}. Connection established for normal data exchange.

### Interview Follow-ups + Answers

**Q: HTTPS?** TLS handshake is separate/above TCP in traditional
HTTP/1.1/2 over TCP setup.`\n`{=tex}`\n*`{=tex}\*Q: HTTP/3?\*\* QUIC
over UDP uses a different transport handshake model.

### Common Mistakes / Confusion

TCP handshake ko HTTPS handshake mat bolo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 43. MAC Address vs IP Address?

**Category:** Networking

### Core Answer --- Detailed Hinglish

MAC address data-link level hardware/interface identifier context mein
use hota hai; IP logical network-layer addressing/routing ke liye use
hota hai.

### WHY / Concept Clarity

Local delivery aur inter-network routing different addressing needs
rakhti hain.

### Practical Example

``` text
MAC → local/link delivery
IP  → logical network routing
```

### Code / Example Where Required

``` text
MAC → local/link delivery
IP  → logical network routing
```

### Step-by-Step Explanation

1.  Destination identify.`\n2`{=tex}. Same local network? Link-layer
    addressing.`\n3`{=tex}. Different network? Router/IP routing
    involved.`\n4`{=tex}. Frame next hop tak deliver.

### Interview Follow-ups + Answers

**Q: MAC changes?** Interface/hardware replacement, virtualization,
configuration etc. se change ho sakta hai.`\n`{=tex}`\n*`{=tex}\*Q: IP
changes?\*\* Network configuration/DHCP etc. se change ho sakta hai.

### Common Mistakes / Confusion

MAC = permanent universal identity bolna oversimplification hai.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 44. Hoisting kya hai?

**Category:** JavaScript

### Core Answer --- Detailed Hinglish

Hoisting JavaScript execution model ka shorthand term hai jisme
declarations ke bindings environment setup phase mein available ho sakte
hain before their textual position. `var`, `let`, `const`, functions ka
behaviour different hota hai.

### WHY / Concept Clarity

Scope aur temporal dead zone samajhne ke liye important hai.

### Practical Example

``` js
console.log(a); // undefined
var a = 10;

// let/const access before declaration → ReferenceError
```

### Code / Example Where Required

``` js
console.log(a); // undefined
var a = 10;

// let/const access before declaration → ReferenceError
```

### Step-by-Step Explanation

1.  Execution context setup.`\n2`{=tex}. Bindings created.`\n3`{=tex}.
    `var` initialized as undefined.`\n4`{=tex}. `let/const` lexical
    bindings TDZ mein remain until declaration evaluation.

### Interview Follow-ups + Answers

**Q: Function declaration?** Hoisting allows invocation before textual
declaration in many cases.`\n`{=tex}`\n*`{=tex}\*Q: TDZ?\*\* `let/const`
declaration line se pehle access window.

### Common Mistakes / Confusion

Hoisting ko literally code upar move hona mat samjho.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 45. == vs ===?

**Category:** JavaScript

### Core Answer --- Detailed Hinglish

`==` loose equality comparison type coercion perform kar sakti hai.
`===` strict equality hai aur type coercion nahi karta.

### WHY / Concept Clarity

Predictable comparisons ke liye generally `===` prefer kiya jata hai.

### Practical Example

``` js
0 == false   // true
0 === false  // false
```

### Code / Example Where Required

``` js
0 == false   // true
0 === false  // false
```

### Step-by-Step Explanation

1.  Values compare.`\n2`{=tex}. `==` coercion rules apply kar sakta
    hai.`\n3`{=tex}. `===` type + value comparison.

### Interview Follow-ups + Answers

**Q: Which prefer?** Usually `===` unless intentional coercion is
clearly understood.

### Common Mistakes / Confusion

Loose equality ke complex coercion rules interview mein casually mat use
karo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 46. Map vs Object?

**Category:** JavaScript

### Core Answer --- Detailed Hinglish

Object primarily property-based general-purpose object hai. `Map`
dedicated key-value collection hai jisme keys various types ki ho sakti
hain aur built-in map operations/size iteration semantics useful hote
hain.

### WHY / Concept Clarity

Dynamic key-value collections ke liye Map often clearer hota hai.

### Practical Example

``` js
const m = new Map();
m.set('id', 10);
console.log(m.get('id'));
```

### Code / Example Where Required

``` js
const m = new Map();
m.set('id', 10);
console.log(m.get('id'));
```

### Step-by-Step Explanation

1.  Key-value requirement identify.`\n2`{=tex}. Dynamic collection? Map
    consider.`\n3`{=tex}. Plain record/config? Object often natural.

### Interview Follow-ups + Answers

**Q: Map keys?** Any value can be key.`\n`{=tex}`\n*`{=tex}\*Q: Object
size?\*\* `Object.keys(obj).length` etc.; Map has `.size`.

### Common Mistakes / Confusion

Map ko automatically faster in every case mat bolo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 47. Array methods map, filter, reduce?

**Category:** JavaScript

### Core Answer --- Detailed Hinglish

`map()` each element ko transform karke new array deta hai. `filter()`
condition pass karne wale elements ki new array deta hai. `reduce()`
values ko accumulate karke single result ya another structure bana sakta
hai.

### WHY / Concept Clarity

Functional array processing readable aur expressive ho sakti hai.

### Practical Example

``` js
const a=[1,2,3];
a.map(x=>x*2);       // [2,4,6]
a.filter(x=>x>1);    // [2,3]
a.reduce((s,x)=>s+x,0); // 6
```

### Code / Example Where Required

``` js
const a=[1,2,3];
a.map(x=>x*2);       // [2,4,6]
a.filter(x=>x>1);    // [2,3]
a.reduce((s,x)=>s+x,0); // 6
```

### Step-by-Step Explanation

1.  Transformation → map.`\n2`{=tex}. Selection → filter.`\n3`{=tex}.
    Accumulation → reduce.

### Interview Follow-ups + Answers

**Q: Mutate original?** These methods generally return new results;
callback itself can mutate referenced objects if you do so.

### Common Mistakes / Confusion

map ko filter/reduce ke replacement ke roop mein blindly mat use karo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 48. REST API kya hai?

**Category:** Web

### Core Answer --- Detailed Hinglish

REST ek architectural style hai jisme resources ko HTTP methods aur
representations ke through expose kiya jata hai. Common methods GET,
POST, PUT/PATCH, DELETE hain.

### WHY / Concept Clarity

Frontend aur backend ke beech predictable resource-based communication
ke liye common approach hai.

### Practical Example

``` text
GET    /users
POST   /users
GET    /users/10
PATCH  /users/10
DELETE /users/10
```

### Code / Example Where Required

``` text
GET    /users
POST   /users
GET    /users/10
PATCH  /users/10
DELETE /users/10
```

### Step-by-Step Explanation

1.  Resource identify.`\n2`{=tex}. Endpoint design.`\n3`{=tex}. HTTP
    method choose.`\n4`{=tex}. Request/response format.`\n5`{=tex}.
    Status code and validation.

### Interview Follow-ups + Answers

**Q: PUT vs PATCH?** PUT generally full replacement semantics; PATCH
partial modification semantics, API design
dependent.`\n`{=tex}`\n*`{=tex}\*Q: Stateless?\*\* REST constraints
include stateless interaction.

### Common Mistakes / Confusion

REST = only JSON API mat samjho; REST broader architectural constraints
hain.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 49. HTTP Status Codes?

**Category:** Web

### Core Answer --- Detailed Hinglish

HTTP status codes response ka general outcome category batate hain: 1xx
informational, 2xx success, 3xx redirection, 4xx client-side request
issue, 5xx server-side failure.

### WHY / Concept Clarity

Debugging aur API design mein correct status codes useful hain.

### Practical Example

``` text
200 OK
201 Created
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
500 Internal Server Error
```

### Code / Example Where Required

``` text
200 OK
201 Created
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
500 Internal Server Error
```

### Step-by-Step Explanation

1.  Request send.`\n2`{=tex}. Server processes.`\n3`{=tex}. Status code
    indicates outcome.`\n4`{=tex}. Client appropriate handling karta
    hai.

### Interview Follow-ups + Answers

**Q: 401 vs 403?** 401 authentication missing/invalid context; 403
authenticated/known client but action not allowed
context.`\n`{=tex}`\n*`{=tex}\*Q: 404?\*\* Resource/route not found
context.

### Common Mistakes / Confusion

401 ko simply 'not admin' aur 403 ko 'not logged in' mat define karo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 50. Authentication vs Authorization?

**Category:** Web

### Core Answer --- Detailed Hinglish

Authentication = user kaun hai verify karna. Authorization = verified
user ko kya access allowed hai decide karna.

### WHY / Concept Clarity

Security systems mein identity aur permission separate concerns hain.

### Practical Example

``` text
Login → Authentication
Role/Permission check → Authorization
```

### Code / Example Where Required

``` text
Login → Authentication
Role/Permission check → Authorization
```

### Step-by-Step Explanation

1.  Identity credentials/token verify.`\n2`{=tex}. User identity
    establish.`\n3`{=tex}. Permission/role check.`\n4`{=tex}. Resource
    access allow/deny.

### Interview Follow-ups + Answers

**Q: JWT?** Token-based authentication/claims mechanism ho sakta
hai.`\n`{=tex}`\n*`{=tex}\*Q: Role-based access?\*\* Permissions roles
se group ki ja sakti hain.

### Common Mistakes / Confusion

Authentication ko authorization ka synonym mat bolo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 51. Git kya hai aur GitHub kya hai?

**Category:** Git

### Core Answer --- Detailed Hinglish

Git distributed version control system hai. GitHub ek online platform
hai jo Git repositories ko host karne aur collaboration features provide
karne ke liye commonly use hota hai.

### WHY / Concept Clarity

Team development mein history, branching, review aur collaboration
important hain.

### Practical Example

``` text
git init
 git add
 git commit
 git push → remote hosting
```

### Code / Example Where Required

``` text
git init
 git add
 git commit
 git push → remote hosting
```

### Step-by-Step Explanation

1.  Local repository.`\n2`{=tex}. Changes stage.`\n3`{=tex}. Commit
    history.`\n4`{=tex}. Remote repository push/pull.`\n5`{=tex}.
    Collaboration.

### Interview Follow-ups + Answers

**Q: Git vs GitHub?** Tool vs hosting/collaboration
platform.`\n`{=tex}`\n*`{=tex}\*Q: Branch?\*\* Parallel line of
development.

### Common Mistakes / Confusion

GitHub ko Git ka alternative mat bolo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 52. Merge vs Rebase?

**Category:** Git

### Core Answer --- Detailed Hinglish

Merge two histories ko combine karta hai aur often merge commit create
kar sakta hai. Rebase commits ko new base ke upar replay karta hai,
history linear kar sakta hai.

### WHY / Concept Clarity

Team workflow aur clean history ke liye difference important hai.

### Practical Example

``` text
feature ──A──B
main    ──C──D

merge → combined history
rebase → feature commits replayed on D
```

### Code / Example Where Required

``` text
feature ──A──B
main    ──C──D

merge → combined history
rebase → feature commits replayed on D
```

### Step-by-Step Explanation

1.  Current branch identify.`\n2`{=tex}. Desired base/history
    decide.`\n3`{=tex}. Merge or rebase.`\n4`{=tex}. Conflicts
    resolve.`\n5`{=tex}. Test and continue.

### Interview Follow-ups + Answers

**Q: Rebase shared public branch?** Generally avoid rewriting history
others depend on.`\n`{=tex}`\n*`{=tex}\*Q: Conflict?\*\* Manually
resolve + test.

### Common Mistakes / Confusion

Rebase ko simply 'better merge' mat bolo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 53. Client vs Server?

**Category:** Backend

### Core Answer --- Detailed Hinglish

Client user-facing side/requesting application ho sakta hai. Server
requests receive karke business logic, data access aur response
generation handle kar sakta hai.

### WHY / Concept Clarity

Modern applications mein frontend/backend responsibilities separate ho
sakti hain.

### Practical Example

``` text
Browser → HTTP Request → Server → DB
Browser ← HTTP Response ← Server
```

### Code / Example Where Required

``` text
Browser → HTTP Request → Server → DB
Browser ← HTTP Response ← Server
```

### Step-by-Step Explanation

1.  Client request.`\n2`{=tex}. Server
    validate/authenticate.`\n3`{=tex}. Business logic.`\n4`{=tex}.
    Database/service calls.`\n5`{=tex}. Response.

### Interview Follow-ups + Answers

**Q: Can client directly access DB?** Generally secure architecture mein
backend/API layer use hoti hai.`\n`{=tex}`\n*`{=tex}\*Q: Server always
one machine?\*\* No, distributed architecture possible.

### Common Mistakes / Confusion

Frontend aur backend ko physical machines ke saath strictly equate mat
karo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 54. Middleware kya hai?

**Category:** Backend

### Core Answer --- Detailed Hinglish

Middleware request/response processing pipeline mein beech ka
function/component hota hai jo common tasks jaise logging,
authentication, validation, error handling etc. perform kar sakta hai.

### WHY / Concept Clarity

Repeated cross-cutting logic ko route handlers mein duplicate karne se
better reusable middleware ho sakta hai.

### Practical Example

``` js
app.use((req,res,next)=>{
  console.log(req.method, req.url);
  next();
});
```

### Code / Example Where Required

``` js
app.use((req,res,next)=>{
  console.log(req.method, req.url);
  next();
});
```

### Step-by-Step Explanation

1.  Request arrives.`\n2`{=tex}. Middleware executes.`\n3`{=tex}. It can
    modify/check request/response.`\n4`{=tex}. `next()` or equivalent
    passes control.`\n5`{=tex}. Route handler executes.

### Interview Follow-ups + Answers

**Q: Middleware auth?** Token/session verify karke request continue/deny
kar sakta hai.`\n`{=tex}`\n*`{=tex}\*Q: Error middleware?\*\*
Framework-specific signature/behaviour follow karta hai.

### Common Mistakes / Confusion

Middleware ko only authentication tak limit mat karo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 55. BFS vs DFS?

**Category:** DSA

### Core Answer --- Detailed Hinglish

BFS (Breadth-First Search) level-by-level traversal karta hai, usually
queue use karta hai. DFS (Depth-First Search) depth mein traverse karta
hai, recursion ya stack use kar sakta hai.

### WHY / Concept Clarity

Unweighted graph mein shortest path by number of edges ke liye BFS
useful hota hai. DFS connectivity, cycle detection, traversal aur
backtracking-type problems mein useful ho sakta hai.

### Practical Example

``` text
BFS → Queue → level by level
DFS → Stack/Recursion → depth first
```

### Code / Example Where Required

``` text
BFS → Queue → level by level
DFS → Stack/Recursion → depth first
```

### Step-by-Step Explanation

1.  Graph/tree represent.`\n2`{=tex}. Start node choose.`\n3`{=tex}.
    BFS: queue + visited.`\n4`{=tex}. DFS: recursion/stack +
    visited.`\n5`{=tex}. Complexity commonly O(V+E) for adjacency-list
    traversal.

### Interview Follow-ups + Answers

**Q: Shortest path in unweighted graph?** BFS.`\n`{=tex}`\n*`{=tex}\*Q:
DFS shortest path?\*\* Not generally guaranteed by first visit.

### Common Mistakes / Confusion

BFS ko always faster aur DFS ko always better mat bolo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 56. Sorting algorithms ka basic comparison?

**Category:** DSA

### Core Answer --- Detailed Hinglish

Bubble Sort, Selection Sort aur Insertion Sort common introductory O(n²)
sorts hain. Merge Sort O(n log n) worst-case stable divide-and-conquer
approach hai; Quick Sort average O(n log n), worst O(n²) depending on
partition/pivot behaviour.

### WHY / Concept Clarity

Algorithm choice constraints, stability, memory and implementation needs
par depend karti hai.

### Practical Example

``` text
Bubble/Selection/Insertion → O(n²) typical
Merge Sort → O(n log n)
Quick Sort → O(n log n) average
```

### Code / Example Where Required

``` text
Bubble/Selection/Insertion → O(n²) typical
Merge Sort → O(n log n)
Quick Sort → O(n log n) average
```

### Step-by-Step Explanation

1.  Input size identify.`\n2`{=tex}. Required stability/in-place
    property.`\n3`{=tex}. Time constraint.`\n4`{=tex}. Suitable
    algorithm choose.

### Interview Follow-ups + Answers

**Q: Stable sort?** Equal-key elements ka relative order preserve karta
hai.`\n`{=tex}`\n*`{=tex}\*Q: Best for nearly sorted?\*\* Insertion sort
can perform well.

### Common Mistakes / Confusion

Sirf time complexity se complete comparison mat karo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 57. Linked List kya hai?

**Category:** DSA

### Core Answer --- Detailed Hinglish

Linked List nodes ki sequence hai jahan each node data aur next/previous
node ka link store kar sakta hai. Array ke unlike nodes contiguous
memory mein necessarily nahi hote.

### WHY / Concept Clarity

Frequent insert/delete at known node positions ke cases mein useful ho
sakti hai, but random access slow hota hai.

### Practical Example

``` js
class Node {
  constructor(value){
    this.value=value;
    this.next=null;
  }
}
```

### Code / Example Where Required

``` js
class Node {
  constructor(value){
    this.value=value;
    this.next=null;
  }
}
```

### Step-by-Step Explanation

1.  Node create.`\n2`{=tex}. Links maintain.`\n3`{=tex}. Traverse from
    head.`\n4`{=tex}. Insert/delete links update karke.

### Interview Follow-ups + Answers

**Q: Access kth element?** O(n).`\n`{=tex}`\n*`{=tex}\*Q: Insert at
head?\*\* O(1) with head reference.

### Common Mistakes / Confusion

Linked list ko random access O(1) mat bolo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 58. Stack applications?

**Category:** DSA

### Core Answer --- Detailed Hinglish

Stack LIFO structure hai. Common uses: function call stack, undo/redo,
balanced parentheses, DFS and expression evaluation.

### WHY / Concept Clarity

Last-added item ko first process karna ho to stack natural fit hai.

### Practical Example

``` js
const stack=[];
stack.push('A');
stack.push('B');
stack.pop(); // B
```

### Code / Example Where Required

``` js
const stack=[];
stack.push('A');
stack.push('B');
stack.pop(); // B
```

### Step-by-Step Explanation

1.  Push items.`\n2`{=tex}. Top tracks latest item.`\n3`{=tex}. Pop
    latest item.`\n4`{=tex}. Empty condition handle.

### Interview Follow-ups + Answers

**Q: Complexity?** Array push/pop at end generally O(1)
amortized.`\n`{=tex}`\n*`{=tex}\*Q: Parentheses?\*\* Opening brackets
push; closing bracket top match.

### Common Mistakes / Confusion

Stack ko queue ke FIFO order se confuse mat karo.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------

## 59. Queue applications?

**Category:** DSA

### Core Answer --- Detailed Hinglish

Queue FIFO structure hai. Jo element pehle enter karta hai, normally
pehle process hota hai.

### WHY / Concept Clarity

Scheduling, BFS aur producer-consumer style systems mein natural fit
hai.

### Practical Example

``` text
Front → [A][B][C] ← Rear
          dequeue A
```

### Code / Example Where Required

``` text
Front → [A][B][C] ← Rear
          dequeue A
```

### Step-by-Step Explanation

1.  Enqueue rear.`\n2`{=tex}. Dequeue front.`\n3`{=tex}. Empty/full
    rules handle.`\n4`{=tex}. BFS mein discovered nodes queue mein add.

### Interview Follow-ups + Answers

**Q: Circular queue?** Fixed-size queue mein space
reuse.`\n`{=tex}`\n*`{=tex}\*Q: Priority queue?\*\* FIFO nahi; priority
ke basis par removal.

### Common Mistakes / Confusion

Priority Queue ko normal Queue mat samjho.

### Mark as Learned

-   [ ] Learned

------------------------------------------------------------------------


# 🔥 Additional Technical Interview Questions — Networking + Core CS Expansion

> **Format:** Har question ke andar Core Answer, WHY / Concept Clarity, Practical Example, Code/Example where required, Step-by-Step Explanation, Interview Follow-ups + Answers, Common Mistakes / Confusion, aur Mark as Learned diya gaya hai.

---

## Q60. What is the difference between OSI Model and TCP/IP Model?

### Core Answer
OSI (Open Systems Interconnection) is a **7-layer conceptual model** used to understand network communication. TCP/IP is the practical protocol model used on the Internet and is commonly represented using **4 layers**.

### WHY / Concept Clarity
OSI helps us understand *where* a networking task happens. TCP/IP focuses more on the actual protocols used in real networks.

### Layers

**OSI – 7 Layers**
1. Physical
2. Data Link
3. Network
4. Transport
5. Session
6. Presentation
7. Application

**TCP/IP – 4 Layers**
1. Network Access
2. Internet
3. Transport
4. Application

### Practical Example
When you open a website:
- Application → HTTP/HTTPS
- Transport → TCP
- Internet → IP
- Network Access → Ethernet/Wi-Fi

### Step-by-Step
1. Application creates the request.
2. Transport adds TCP/UDP information.
3. Internet layer adds IP information.
4. Network access sends frames through the physical network.

### Interview Follow-ups + Answers
**Q: Which model has 7 layers?**  
A: OSI.

**Q: Which model is used practically on the Internet?**  
A: TCP/IP protocol suite.

### Common Mistakes / Confusion
- Do not say TCP/IP has exactly the same seven layers as OSI.
- OSI is mainly a reference model; TCP/IP is a protocol suite/model.

### Mark as Learned
☐ Learned

---

## Q61. What is a MAC Address?

### Core Answer
A **MAC address (Media Access Control address)** is a hardware/network-interface address used for communication at the Data Link layer.

It is usually represented as **48 bits / 6 bytes**, for example:

`00:1A:2B:3C:4D:5E`

### WHY / Concept Clarity
IP identifies a device/interface logically on a network, while MAC identifies the network interface at the local network level.

### Practical Example
If your laptop communicates with your Wi-Fi router, Ethernet/Wi-Fi frames use MAC addresses for local delivery.

### Step-by-Step
1. Your device wants to send a frame.
2. It needs the destination MAC for the local network.
3. ARP can help discover the MAC associated with an IPv4 address.
4. The frame is sent using MAC addressing.

### Interview Follow-ups + Answers
**Q: Is MAC address the same as IP address?**  
A: No. MAC works mainly at the Data Link layer; IP works at the Network layer.

**Q: Can a device have more than one MAC address?**  
A: Yes. Different network interfaces can have different MAC addresses.

### Common Mistakes / Confusion
- MAC is not used for Internet routing in the same way IP is.
- Do not confuse MAC with IPv4/IPv6.

### Mark as Learned
☐ Learned

---

## Q62. What is ARP and why is it required?

### Core Answer
**ARP (Address Resolution Protocol)** is used in IPv4 networks to find the **MAC address associated with an IP address** on the local network.

### WHY / Concept Clarity
An application may know the destination IP, but local Ethernet/Wi-Fi delivery requires a MAC address.

### Practical Example
Suppose your laptop wants to send data to:

`192.168.1.1`

It may ask:

“Who has 192.168.1.1? Tell me your MAC address.”

The router replies with its MAC.

### Step-by-Step
1. Sender checks its ARP cache.
2. If the mapping is missing, it sends an ARP request.
3. The request is broadcast on the local network.
4. The device owning that IP sends an ARP reply.
5. Sender stores the mapping temporarily and sends the frame.

### Interview Follow-ups + Answers
**Q: Is ARP used to find a public Internet server's MAC?**  
A: No. MAC addressing is local-link based. Your machine normally resolves the local next-hop MAC, often the router.

**Q: Is ARP used with IPv6?**  
A: IPv6 uses Neighbor Discovery Protocol (NDP) instead of ARP.

### Common Mistakes / Confusion
- ARP does not translate a domain name to an IP.
- DNS handles domain-name resolution.

### Mark as Learned
☐ Learned

---

## Q63. What is a Port Number?

### Core Answer
A **port number** is a logical number used to identify a specific application/service on a host.

Port numbers range from **0 to 65535**.

### WHY / Concept Clarity
An IP address identifies the host, while a port helps identify the service/process receiving network traffic.

### Practical Example
A web server may listen on:
- HTTP → port 80
- HTTPS → port 443
- SSH → port 22
- DNS commonly → port 53

### Step-by-Step
1. Packet reaches the correct IP address.
2. Transport-layer information contains source and destination ports.
3. Operating system uses the destination port to deliver data to the correct socket/application.

### Interview Follow-ups + Answers
**Q: Is port 443 an IP address?**  
A: No. It is a port number commonly associated with HTTPS.

**Q: Can two services use the same port on the same IP?**  
A: Generally they cannot bind to the exact same IP/protocol/port combination simultaneously.

### Common Mistakes / Confusion
- Port number ≠ IP address.
- Port belongs to transport-layer communication.

### Mark as Learned
☐ Learned

---

## Q64. What are well-known, registered and dynamic/private ports?

### Core Answer
Port numbers are commonly grouped as:
- **0–1023:** Well-known/system ports
- **1024–49151:** Registered ports
- **49152–65535:** Dynamic/private ports

### WHY / Concept Clarity
This organization helps services and temporary client connections use predictable port ranges.

### Practical Example
A browser may connect to a web server on port 443 while using a temporary client-side port such as `53000`.

### Step-by-Step
1. Server listens on a known service port.
2. Client chooses an available ephemeral/dynamic port.
3. TCP connection uses both source and destination ports.

### Interview Follow-ups + Answers
**Q: Does every browser use port 443 as its source port?**  
A: No. For an HTTPS connection, 443 is normally the server destination port; the client usually uses an ephemeral source port.

### Common Mistakes / Confusion
- Do not assume both sides use the same port.

### Mark as Learned
☐ Learned

---

## Q65. What is a Socket?

### Core Answer
A **socket** is an endpoint used by an application for network communication.

A TCP connection is commonly identified by a combination of:
- Source IP
- Source port
- Destination IP
- Destination port
- Transport protocol

### WHY / Concept Clarity
Applications do not directly manipulate raw network cables. They communicate through sockets provided by the operating system.

### Practical Example
A backend server creates a socket and listens on port 3000.

```js
// Conceptual example
server.listen(3000);
```

### Step-by-Step
1. Server creates a socket.
2. It binds to an IP/port.
3. It listens for connections.
4. Client connects.
5. Application exchanges data through the socket.

### Interview Follow-ups + Answers
**Q: Is a socket the same as a port?**  
A: No. A port is a number; a socket is a communication endpoint associated with networking details.

### Common Mistakes / Confusion
- Do not define socket simply as “a port.”

### Mark as Learned
☐ Learned

---

## Q66. What is DNS and how does DNS resolution work?

### Core Answer
**DNS (Domain Name System)** converts human-readable domain names into IP addresses.

Example:

`google.com → IP address`

### WHY / Concept Clarity
Humans prefer domain names; networks need IP addresses for routing.

### Practical Example
When you enter:

`https://example.com`

the browser needs to know the server's IP address.

### Step-by-Step
1. Browser checks its DNS/browser cache.
2. Operating system may check its local cache.
3. Query may go to a recursive DNS resolver.
4. Resolver may contact DNS hierarchy/root, TLD and authoritative DNS servers as needed.
5. IP address is returned.
6. Browser can connect to the destination.

### Interview Follow-ups + Answers
**Q: Does DNS transfer website HTML?**  
A: No. DNS primarily resolves names to records such as IP addresses. HTTP/HTTPS transfers web content.

**Q: What is an A record?**  
A: It maps a domain name to an IPv4 address.

**Q: What is an AAAA record?**  
A: It maps a domain name to an IPv6 address.

### Common Mistakes / Confusion
- DNS is not the same as HTTP.
- DNS can return different record types, not only IP addresses.

### Mark as Learned
☐ Learned

---

## Q67. What is DHCP?

### Core Answer
**DHCP (Dynamic Host Configuration Protocol)** automatically provides network configuration to devices, such as:
- IP address
- Subnet mask/prefix
- Default gateway
- DNS server information

### WHY / Concept Clarity
Without DHCP, users would often need to configure network settings manually.

### Practical Example
You connect your phone to Wi-Fi. The router/DHCP server can assign your phone an IP address automatically.

### Step-by-Step — DORA
DHCP commonly follows:
1. **Discover**
2. **Offer**
3. **Request**
4. **Acknowledge**

### Interview Follow-ups + Answers
**Q: Does DHCP provide Internet itself?**  
A: No. It provides network configuration. Internet access also depends on routing, NAT, ISP connectivity, DNS, etc.

### Common Mistakes / Confusion
- DHCP and DNS are different.
- DHCP assigns configuration; DNS resolves names.

### Mark as Learned
☐ Learned

---

## Q68. What is a Default Gateway?

### Core Answer
A **default gateway** is the router/interface a device uses to send traffic destined for networks outside its local network.

### WHY / Concept Clarity
Your laptop can directly communicate with devices in its local subnet. For another network, it usually sends the packet to the router/default gateway.

### Practical Example
Laptop:

`192.168.1.20`

Gateway:

`192.168.1.1`

If the laptop wants to reach a server on another network, it forwards the packet to the gateway.

### Step-by-Step
1. Device checks destination IP.
2. It determines whether the destination is local.
3. If not local, it sends the packet to the default gateway.
4. Router forwards it toward the destination.

### Interview Follow-ups + Answers
**Q: Is gateway the same as DNS?**  
A: No. Gateway handles routing to other networks; DNS resolves names.

### Common Mistakes / Confusion
- Gateway is not necessarily “the Internet.”
- It is typically the local router/next-hop for off-subnet traffic.

### Mark as Learned
☐ Learned

---

## Q69. What is NAT?

### Core Answer
**NAT (Network Address Translation)** changes network address information as traffic passes through a router/firewall.

A common use is allowing many private devices to share a public IPv4 address.

### WHY / Concept Clarity
Private IPv4 ranges are not globally routable. NAT allows private devices to communicate through a public address.

### Practical Example
Home network:

- Laptop → `192.168.1.10`
- Phone → `192.168.1.11`
- Router public IP → one public IPv4 address

The router can translate outbound connections so multiple devices share the public address.

### Step-by-Step
1. Private device sends traffic.
2. NAT router changes source address/port as needed.
3. Internet server replies to the translated public endpoint.
4. Router maps the response back to the internal device.

### Interview Follow-ups + Answers
**Q: Is NAT a security feature?**  
A: NAT can hide private addresses from direct inbound Internet routing, but NAT itself is not a complete security mechanism. Firewalls provide access-control security.

### Common Mistakes / Confusion
- NAT ≠ firewall.
- NAT does not eliminate the need for proper security.

### Mark as Learned
☐ Learned

---

## Q70. What is a Private IP and what are common private IPv4 ranges?

### Core Answer
Private IPv4 addresses are reserved for use inside private networks and are not directly routable on the public Internet.

Common private ranges:
- `10.0.0.0/8`
- `172.16.0.0/12`
- `192.168.0.0/16`

### WHY / Concept Clarity
Private addresses allow organizations and home networks to build internal networks without needing a unique public IPv4 address for every device.

### Practical Example
A home router may give your laptop:

`192.168.1.20`

### Interview Follow-ups + Answers
**Q: Is 172.20.5.4 private?**  
A: Yes, because it falls inside `172.16.0.0/12`.

**Q: Is 172.50.5.4 private?**  
A: No.

### Common Mistakes / Confusion
- Not every `172.x.x.x` address is private.
- The private range is specifically `172.16.0.0` through `172.31.255.255`.

### Mark as Learned
☐ Learned

---

## Q71. What is Subnetting?

### Core Answer
**Subnetting** divides a larger IP network into smaller logical networks called subnets.

### WHY / Concept Clarity
Subnetting helps with:
- Efficient IP allocation
- Network organization
- Broadcast-domain control
- Routing design
- Security segmentation

### Practical Example
Instead of one large network, an organization can create separate subnets for:
- Development
- HR
- Finance
- Servers

### Step-by-Step
1. Start with a network/prefix.
2. Borrow host bits to create more subnet bits.
3. This creates smaller networks.
4. Each subnet has a network address and broadcast address in IPv4.

### Interview Follow-ups + Answers
**Q: Does subnetting increase or decrease the number of networks?**  
A: It increases the number of smaller networks/subnets while reducing the number of usable host addresses per subnet.

### Common Mistakes / Confusion
- Subnetting is not simply “changing the IP.”
- Prefix length determines the network/host split.

### Mark as Learned
☐ Learned

---

## Q72. Explain CIDR notation with an example.

### Core Answer
**CIDR (Classless Inter-Domain Routing)** represents an IPv4 network using an IP address and prefix length.

Example:

`192.168.1.0/24`

`/24` means the first 24 bits represent the network prefix.

### WHY / Concept Clarity
CIDR provides flexible network sizes instead of relying on old fixed class-based network sizes.

### Practical Example
For `192.168.1.0/24`:
- Total IPv4 addresses = `2^(32-24) = 256`
- Traditional usable host addresses = 254, excluding network and broadcast addresses.

### Step-by-Step
1. IPv4 has 32 bits.
2. `/24` reserves 24 bits for the network prefix.
3. Remaining 8 bits are available for host addressing.
4. `2^8 = 256` total addresses.

### Interview Follow-ups + Answers
**Q: How many total addresses are in /26?**  
A: `2^(32-26) = 64`.

**Q: Traditional usable hosts in /26?**  
A: 62, excluding network and broadcast addresses.

### Common Mistakes / Confusion
- Total addresses and usable host addresses are not always the same.
- Modern networking has special cases such as /31 and /32.

### Mark as Learned
☐ Learned

---

## Q73. How do you calculate the number of hosts in a subnet?

### Core Answer
For a normal IPv4 subnet, if `h` bits are available for hosts:

`Total addresses = 2^h`

Traditionally:

`Usable hosts = 2^h - 2`

### Practical Example
For `/27`:

Host bits:

`32 - 27 = 5`

Total:

`2^5 = 32`

Traditional usable hosts:

`32 - 2 = 30`

### Step-by-Step
1. IPv4 = 32 bits.
2. Subtract prefix length.
3. Calculate `2^(remaining bits)`.
4. Usually subtract network and broadcast addresses.

### Interview Follow-ups + Answers
**Q: How many usable hosts in /28?**  
A: 14 in the traditional IPv4 subnet calculation.

**Q: Why subtract 2?**  
A: One address is the network address and one is the broadcast address.

### Common Mistakes / Confusion
- Do not blindly apply `-2` to every possible networking scenario.
- Know that /31 and /32 have special uses.

### Mark as Learned
☐ Learned

---

## Q74. What is a Broadcast Address?

### Core Answer
A **broadcast address** is an IPv4 address used to send traffic to all hosts within a broadcast domain/subnet.

### Practical Example
For:

`192.168.1.0/24`

Traditional broadcast address:

`192.168.1.255`

### Step-by-Step
1. Identify the subnet.
2. Set all host bits to 1.
3. The resulting address is the broadcast address.

### Interview Follow-ups + Answers
**Q: Does IPv6 use broadcast?**  
A: IPv6 does not use traditional broadcast; it uses multicast and other mechanisms.

### Common Mistakes / Confusion
- Broadcast address is not a normal host address in a traditional IPv4 subnet.

### Mark as Learned
☐ Learned

---

## Q75. What is the difference between Unicast, Broadcast and Multicast?

### Core Answer
- **Unicast:** one sender → one receiver
- **Broadcast:** one sender → all devices in the broadcast domain
- **Multicast:** one sender → a subscribed/group of receivers

### Practical Example
- Opening a website → generally unicast.
- IPv4 local broadcast → broadcast.
- Streaming to subscribed group receivers → multicast concept.

### WHY / Concept Clarity
These describe different traffic delivery patterns.

### Interview Follow-ups + Answers
**Q: Does IPv6 support broadcast?**  
A: No traditional broadcast; multicast is used instead.

### Common Mistakes / Confusion
- Multicast is not the same as broadcast.
- Broadcast targets all nodes in a broadcast domain; multicast targets a group.

### Mark as Learned
☐ Learned

---

## Q76. What is the difference between Hub, Switch and Router?

### Core Answer
**Hub**
- Works at the Physical layer.
- Repeats signals to ports.
- Does not intelligently forward based on MAC addresses.

**Switch**
- Primarily works at the Data Link layer.
- Uses MAC addresses to forward Ethernet frames.

**Router**
- Works primarily at the Network layer.
- Uses IP addresses and routing information to forward packets between networks.

### Practical Example
Home network:
- Devices connect to a switch/Wi-Fi access point.
- Router connects the local network to other networks/Internet.

### Interview Follow-ups + Answers
**Q: Which device separates networks?**  
A: Router.

**Q: Which device uses MAC addresses for forwarding?**  
A: A Layer 2 switch.

### Common Mistakes / Confusion
- A modern device may combine multiple networking functions.
- Do not say every switch is only a “MAC device” without considering Layer 3 switches.

### Mark as Learned
☐ Learned

---

## Q77. What is a VLAN?

### Core Answer
A **VLAN (Virtual Local Area Network)** logically separates devices into different Layer 2 networks even when they share the same physical switching infrastructure.

### WHY / Concept Clarity
VLANs improve network organization, isolation and management.

### Practical Example
One physical switch can have:
- VLAN 10 → HR
- VLAN 20 → Development
- VLAN 30 → Servers

### Step-by-Step
1. Switch ports are assigned to VLANs.
2. Broadcast traffic stays within the VLAN.
3. Communication between VLANs requires Layer 3 routing.

### Interview Follow-ups + Answers
**Q: Can devices in different VLANs communicate directly at Layer 2?**  
A: No. Inter-VLAN routing is required.

### Common Mistakes / Confusion
- VLAN is logical segmentation, not simply a different physical switch.

### Mark as Learned
☐ Learned

---

## Q78. What is a Firewall?

### Core Answer
A **firewall** controls network traffic according to security rules.

Rules can consider things such as:
- Source/destination IP
- Port
- Protocol
- Connection state
- Application-level information in advanced systems

### Practical Example
A server may allow:
- HTTPS 443
- SSH 22 only from a trusted network

and block unwanted inbound traffic.

### WHY / Concept Clarity
A firewall helps reduce unauthorized network access.

### Interview Follow-ups + Answers
**Q: Is firewall the same as antivirus?**  
A: No. Firewall controls network traffic; antivirus/endpoint security focuses on malicious software and endpoint threats.

### Common Mistakes / Confusion
- A firewall is not automatically perfect protection.
- Security requires multiple layers.

### Mark as Learned
☐ Learned

---

## Q79. What is a Proxy Server?

### Core Answer
A **proxy server** acts as an intermediary between a client and another server.

### WHY / Concept Clarity
A proxy can be used for:
- Access control
- Caching
- Logging
- Content filtering
- Hiding client details from the destination in some architectures

### Practical Example
Company computers may send web requests through a corporate proxy that applies access policies.

### Interview Follow-ups + Answers
**Q: Is a proxy the same as a router?**  
A: No. A router primarily forwards packets between networks; a proxy acts as an intermediary at a higher communication layer.

### Common Mistakes / Confusion
- Proxy and VPN are not identical technologies.

### Mark as Learned
☐ Learned

---

## Q80. What is a VPN?

### Core Answer
A **VPN (Virtual Private Network)** creates an encrypted/tunneled connection between endpoints over another network.

### WHY / Concept Clarity
VPNs are commonly used for:
- Secure remote access
- Connecting private networks
- Protecting traffic over untrusted networks, depending on configuration

### Practical Example
An employee working remotely can use a company VPN to access internal services.

### Interview Follow-ups + Answers
**Q: Does VPN automatically make you anonymous?**  
A: No. A VPN changes the network path and can protect traffic in transit, but it does not guarantee complete anonymity.

### Common Mistakes / Confusion
- VPN ≠ antivirus.
- VPN does not automatically make every activity private.

### Mark as Learned
☐ Learned

---

## Q81. What is the TCP Three-Way Handshake?

### Core Answer
TCP uses a three-step handshake to establish a connection:

1. **SYN**
2. **SYN-ACK**
3. **ACK**

### WHY / Concept Clarity
Both sides need to establish communication state and synchronize sequence information before normal TCP data transfer.

### Practical Example
When a client connects to a TCP server:
- Client → SYN
- Server → SYN-ACK
- Client → ACK

Then data transfer can begin.

### Step-by-Step
1. Client sends SYN with an initial sequence number.
2. Server responds with SYN + ACK.
3. Client sends ACK.
4. Connection becomes established.

### Interview Follow-ups + Answers
**Q: Does UDP use this handshake?**  
A: No. UDP is connectionless and does not perform a TCP-style three-way handshake.

### Common Mistakes / Confusion
- Handshake is for establishing TCP connection state, not for sending all application data.

### Mark as Learned
☐ Learned

---

## Q82. Why is TCP called connection-oriented?

### Core Answer
TCP establishes connection state before reliable data transfer and maintains state during communication.

### WHY / Concept Clarity
TCP provides features such as:
- Reliable delivery
- Ordered byte stream
- Retransmission
- Flow control
- Congestion control

### Practical Example
File transfer and many web connections benefit from reliable ordered delivery.

### Interview Follow-ups + Answers
**Q: Does TCP guarantee that the application will always get a response?**  
A: No. TCP provides reliable transport between endpoints if the connection can operate, but application-level success depends on the application/server.

### Common Mistakes / Confusion
- TCP reliability does not mean the Internet itself never loses packets.

### Mark as Learned
☐ Learned

---

## Q83. What is UDP and when would you choose it?

### Core Answer
**UDP (User Datagram Protocol)** is a connectionless transport protocol with low overhead. It does not provide TCP-style guaranteed delivery or ordering.

### WHY / Concept Clarity
Some applications prefer lower overhead and can handle loss or ordering themselves.

### Practical Examples
UDP is commonly used by protocols/applications such as:
- DNS queries in common configurations
- Real-time media
- Online gaming traffic
- QUIC/HTTP/3 uses UDP as its transport foundation

### Interview Follow-ups + Answers
**Q: Is UDP always faster than TCP?**  
A: Not as a blanket rule. UDP has lower protocol overhead and avoids TCP connection/reliability mechanisms, but actual application performance depends on the system.

### Common Mistakes / Confusion
- UDP is not “bad” because it is unreliable.
- Applications can build their own reliability mechanisms over UDP.

### Mark as Learned
☐ Learned

---

## Q84. What is Flow Control in TCP?

### Core Answer
**Flow control** prevents a fast sender from overwhelming a receiver that cannot process data quickly enough.

### WHY / Concept Clarity
The receiver advertises how much data it can currently accept using the TCP receive window.

### Practical Example
If a receiver has limited buffer space, it can advertise a smaller receive window.

### Step-by-Step
1. Receiver reports available receive capacity.
2. Sender limits outstanding unacknowledged data accordingly.
3. Receiver processes data.
4. Window can change as capacity changes.

### Interview Follow-ups + Answers
**Q: Is flow control the same as congestion control?**  
A: No.
- Flow control → protects the receiver.
- Congestion control → manages traffic relative to network congestion.

### Common Mistakes / Confusion
- Do not use the two terms interchangeably.

### Mark as Learned
☐ Learned

---

## Q85. What is Congestion Control?

### Core Answer
**Congestion control** manages how much traffic a sender injects into the network to reduce congestion and packet loss.

### WHY / Concept Clarity
A network can become overloaded even if the receiver is capable of processing more data.

### Practical Example
TCP adjusts its sending behavior based on network conditions.

### Interview Follow-ups + Answers
**Q: Flow control protects whom?**  
A: Receiver.

**Q: Congestion control focuses on what?**  
A: The network path's congestion.

### Common Mistakes / Confusion
- Flow control and congestion control solve different problems.

### Mark as Learned
☐ Learned

---

## Q86. What is HTTP and how does an HTTP request work?

### Core Answer
**HTTP (Hypertext Transfer Protocol)** is an application-layer protocol used for communication between clients and servers.

### Practical Example
Browser sends:

```http
GET /products HTTP/1.1
Host: example.com
```

Server returns a response containing status, headers and possibly a body.

### Step-by-Step
1. Client prepares request.
2. Request contains method, path, headers and optional body.
3. Server processes it.
4. Server sends status code, headers and optional response body.
5. Client uses the response.

### Interview Follow-ups + Answers
**Q: Is HTTP stateful?**  
A: HTTP itself is stateless at the protocol level; applications can maintain state using cookies, sessions, tokens, databases, etc.

### Common Mistakes / Confusion
- HTTP request and HTTP response are different.
- HTTP is application layer, not transport layer.

### Mark as Learned
☐ Learned

---

## Q87. What is HTTPS?

### Core Answer
**HTTPS = HTTP over a secure TLS connection.**

It protects communication against eavesdropping and tampering in transit and provides server authentication through certificates.

### WHY / Concept Clarity
Normal HTTP can expose traffic to network observers. HTTPS encrypts application traffic over the TLS connection.

### Practical Example
`https://example.com`

The browser establishes a secure TLS connection before exchanging protected HTTP data.

### Interview Follow-ups + Answers
**Q: Does HTTPS hide the domain from everyone?**  
A: Not necessarily. Modern HTTPS protects HTTP contents, but some connection metadata can still be observable depending on the network and protocol.

### Common Mistakes / Confusion
- HTTPS does not mean the website itself is trustworthy.
- HTTPS protects communication; it does not guarantee that the server has no vulnerabilities.

### Mark as Learned
☐ Learned

---

## Q88. What is TLS and what does a certificate do?

### Core Answer
**TLS (Transport Layer Security)** is a cryptographic protocol used to secure communication.

A server certificate helps the client verify the server's identity and contains information used during the TLS authentication process.

### WHY / Concept Clarity
Encryption alone is not enough. The client also needs confidence about whom it is communicating with.

### Practical Example
When you visit a secure website, the browser validates its certificate chain against trusted certificate authorities.

### Interview Follow-ups + Answers
**Q: Does a certificate contain the website password?**  
A: No.

**Q: What does certificate validation help prove?**  
A: That the server identity is associated with a trusted certificate chain and valid domain/usage conditions.

### Common Mistakes / Confusion
- Certificate ≠ encryption key stored as plain text for everyone.
- HTTPS uses asymmetric cryptography during setup and symmetric cryptography for efficient bulk data encryption.

### Mark as Learned
☐ Learned

---

## Q89. What are HTTP status code categories?

### Core Answer
HTTP status codes are grouped into categories:

- **1xx** → Informational
- **2xx** → Success
- **3xx** → Redirection
- **4xx** → Client-side error
- **5xx** → Server-side error

### Important Examples
- `200 OK`
- `201 Created`
- `204 No Content`
- `301/302` Redirect
- `400 Bad Request`
- `401 Unauthorized`
- `403 Forbidden`
- `404 Not Found`
- `500 Internal Server Error`
- `502 Bad Gateway`
- `503 Service Unavailable`

### Interview Follow-ups + Answers
**Q: Difference between 401 and 403?**  
A: 401 indicates authentication is required/failed in the relevant context; 403 means the server understood the request but refuses access.

### Common Mistakes / Confusion
- 401 does not simply mean “you have no permission.”
- 404 does not always prove the resource never existed; applications may intentionally hide resource existence.

### Mark as Learned
☐ Learned

---

## Q90. What is the difference between GET, POST, PUT, PATCH and DELETE?

### Core Answer
These are common HTTP methods:

- **GET** → retrieve data
- **POST** → create/process a new resource or submit data
- **PUT** → replace/update a resource representation
- **PATCH** → partially update a resource
- **DELETE** → delete a resource

### Practical Example
For `/users/10`:
- GET → get user
- PATCH → update selected user fields
- DELETE → delete user

### Interview Follow-ups + Answers
**Q: Is GET supposed to change server state?**  
A: GET is defined as a safe method and should not be used for intentional state-changing operations.

**Q: PUT vs PATCH?**  
A: PUT generally represents replacement; PATCH represents partial modification.

### Common Mistakes / Confusion
- “POST always means only insert” is too simplistic.
- Actual API behavior depends on API design.

### Mark as Learned
☐ Learned

---

## Q91. What is REST API?

### Core Answer
A **REST-style API** exposes resources through HTTP using standard methods and representations.

### Practical Example

```text
GET    /users
GET    /users/10
POST   /users
PATCH  /users/10
DELETE /users/10
```

### WHY / Concept Clarity
Resource-oriented URLs and standard HTTP semantics make APIs predictable and easier to consume.

### Interview Follow-ups + Answers
**Q: Is REST a programming language?**  
A: No. REST is an architectural style.

**Q: Is JSON mandatory for REST?**  
A: No. JSON is common, but REST is not restricted to JSON.

### Common Mistakes / Confusion
- REST ≠ JSON.
- REST ≠ HTTP itself, although REST APIs commonly use HTTP.

### Mark as Learned
☐ Learned

---

## Q92. What is Latency vs Bandwidth?

### Core Answer
**Latency** = time taken for data/request to travel between endpoints or for an operation to complete.

**Bandwidth** = maximum data transfer capacity of a network link, usually measured in bits per second.

### Practical Example
A connection can have:
- High bandwidth but high latency.
- Lower bandwidth but low latency.

For interactive gaming, latency is especially important. For large file downloads, bandwidth is highly important.

### Interview Follow-ups + Answers
**Q: Is 1 Gbps bandwidth the same as 1 ms latency?**  
A: No. They measure completely different things.

### Common Mistakes / Confusion
- Do not say bandwidth means “speed” without explaining the difference.
- Latency is not simply download speed.

### Mark as Learned
☐ Learned

---

## Q93. What is Packet Loss?

### Core Answer
**Packet loss** occurs when packets sent across a network fail to reach the intended destination.

### WHY / Concept Clarity
Packet loss can result from congestion, faulty hardware, wireless interference, configuration problems or other network issues.

### Symptoms
- Slow applications
- Video/audio glitches
- Retransmissions
- Timeouts
- Gaming lag

### Interview Follow-ups + Answers
**Q: Does TCP handle packet loss?**  
A: TCP can detect missing data and retransmit it.

### Common Mistakes / Confusion
- TCP can recover from some packet loss, but packet loss can still hurt performance.

### Mark as Learned
☐ Learned

---

## Q94. What is Ping and what does it test?

### Core Answer
**Ping** commonly uses ICMP Echo Request/Reply to test reachability and measure round-trip time.

### Practical Example
```bash
ping 8.8.8.8
```

### WHY / Concept Clarity
Ping helps determine whether an IP destination responds and gives an approximate round-trip latency.

### Step-by-Step
1. Host sends ICMP Echo Request.
2. Destination sends Echo Reply if allowed.
3. Tool measures round-trip time.

### Interview Follow-ups + Answers
**Q: If ping fails, does that always mean the server is down?**  
A: No. ICMP may be blocked by a firewall or the destination may intentionally not respond.

### Common Mistakes / Confusion
- Ping failure does not prove the application is unavailable.

### Mark as Learned
☐ Learned

---

## Q95. What is traceroute/tracert?

### Core Answer
**Traceroute** (Linux/macOS) and **tracert** (Windows) help show the network path/hops toward a destination.

### Practical Example
```bash
traceroute example.com
```

Windows:
```cmd
tracert example.com
```

### WHY / Concept Clarity
It helps identify where delays or routing problems may occur along the path.

### Interview Follow-ups + Answers
**Q: Does traceroute always show every router?**  
A: No. Some routers may not respond to the probing method or may hide/limit responses.

### Common Mistakes / Confusion
- A `*` does not automatically mean that hop is broken.

### Mark as Learned
☐ Learned

---

## Q96. What happens when you type a URL in a browser?

### Core Answer
A simplified flow is:

1. Browser parses the URL.
2. Browser checks caches/available DNS information.
3. DNS resolution obtains the server address if needed.
4. Browser establishes transport connection (TCP for HTTP/1.1 or HTTP/2; QUIC over UDP for HTTP/3).
5. For HTTPS, TLS is established.
6. Browser sends HTTP request.
7. Server processes request.
8. Server sends response.
9. Browser parses HTML and requests required resources.
10. Browser builds and renders the page.

### WHY / Concept Clarity
This is one of the most important combined networking interview questions because it connects DNS, TCP/IP, TLS, HTTP and browser concepts.

### Interview Follow-ups + Answers
**Q: Where does DNS happen?**  
A: Before the browser can connect using the resolved destination address, unless a cached/resolved address is already available.

**Q: Does every website use TCP?**  
A: HTTP/1.1 and HTTP/2 commonly run over TCP; HTTP/3 uses QUIC over UDP.

### Common Mistakes / Confusion
- Do not claim every request always follows exactly one fixed sequence.
- Browser caches, connection reuse, HTTP/3, service workers and proxies can change details.

### Mark as Learned
☐ Learned

---

## Q97. What is HTTP Keep-Alive / Connection Reuse?

### Core Answer
Connection reuse allows multiple HTTP requests/responses to use an existing connection instead of creating a new connection for every request.

### WHY / Concept Clarity
Repeatedly creating connections adds latency and overhead.

### Practical Example
A browser loads:
- HTML
- CSS
- JS
- images

Reusing connections can improve performance.

### Interview Follow-ups + Answers
**Q: Is HTTP keep-alive the same as WebSocket?**  
A: No. Keep-alive/reused HTTP connections are not the same as a persistent bidirectional WebSocket connection.

### Common Mistakes / Confusion
- Do not equate connection reuse with WebSockets.

### Mark as Learned
☐ Learned

---

## Q98. What is WebSocket?

### Core Answer
**WebSocket** provides a persistent, full-duplex communication channel between client and server.

### WHY / Concept Clarity
Normal request-response HTTP is not ideal for continuously pushing real-time updates. WebSocket allows both sides to send messages over the established connection.

### Practical Examples
- Live chat
- Real-time notifications
- Multiplayer updates
- Live dashboards

### Interview Follow-ups + Answers
**Q: Is WebSocket the same as HTTP polling?**  
A: No. Polling repeatedly sends requests; WebSocket maintains a persistent communication channel.

### Common Mistakes / Confusion
- WebSocket is not simply “faster HTTP.”
- It is a different communication mechanism.

### Mark as Learned
☐ Learned

---

## Q99. What is a CDN?

### Core Answer
**CDN (Content Delivery Network)** is a distributed network of servers that delivers content from locations closer to users.

### WHY / Concept Clarity
Serving static content from a nearby edge location can reduce latency and decrease load on the origin server.

### Practical Example
Images, CSS, JavaScript and video segments may be delivered through CDN edge servers.

### Interview Follow-ups + Answers
**Q: Does CDN replace the backend server?**  
A: Usually no. It can cache and serve suitable content while the origin/backend still handles dynamic or uncached work.

### Common Mistakes / Confusion
- CDN is not just “another hosting server.”
- Dynamic caching depends on configuration.

### Mark as Learned
☐ Learned

---

## Q100. What is a Reverse Proxy?

### Core Answer
A **reverse proxy** sits in front of backend servers and receives requests on their behalf.

### WHY / Concept Clarity
It can provide:
- Load balancing
- TLS termination
- Caching
- Routing
- Security controls
- Centralized access/logging

### Practical Example

```text
Client
  ↓
Reverse Proxy
  ↓
Backend 1
Backend 2
Backend 3
```

### Interview Follow-ups + Answers
**Q: Reverse proxy vs forward proxy?**  
A:
- Forward proxy represents clients to servers.
- Reverse proxy represents servers to clients.

### Common Mistakes / Confusion
- Do not confuse reverse proxy with a load balancer; a reverse proxy can perform load balancing, but the concepts are not identical.

### Mark as Learned
☐ Learned

---

## Q101. What is Load Balancing?

### Core Answer
**Load balancing** distributes incoming traffic across multiple backend servers.

### WHY / Concept Clarity
It can improve:
- Availability
- Scalability
- Resource utilization
- Fault tolerance

### Practical Example

```text
                 ┌── Server 1
Client → LB ─────┼── Server 2
                 └── Server 3
```

### Common Algorithms
- Round Robin
- Least Connections
- Weighted strategies
- Hash-based strategies

### Interview Follow-ups + Answers
**Q: Does load balancing automatically make a system fault tolerant?**  
A: It can improve availability, but true fault tolerance also requires healthy-instance detection, redundancy and proper system design.

### Common Mistakes / Confusion
- Load balancing is not just “splitting traffic equally.”

### Mark as Learned
☐ Learned

---

## Q102. What is the difference between Stateful and Stateless communication?

### Core Answer
**Stateless:** Each request contains the information needed to process it; the server does not rely on stored conversational state in the same way.

**Stateful:** The system maintains state between interactions.

### Practical Example
A REST API is commonly designed to be stateless at the protocol/application interaction level, while a server-side session system stores user session state.

### Interview Follow-ups + Answers
**Q: Does stateless mean the server stores absolutely no data?**  
A: No. It means the server does not need conversational state from previous requests to understand the current request in the intended REST interaction model.

### Common Mistakes / Confusion
- Stateless does not mean “database is not used.”

### Mark as Learned
☐ Learned

---

# 🔥 Additional DSA / C++ / SQL / DBMS / OS / JavaScript Questions

## Q103. What is a Hash Table?

### Core Answer
A **hash table** stores key-value data and uses a hash function to determine where a key should be stored.

### WHY / Concept Clarity
Average-case lookup, insertion and deletion can be **O(1)** under good conditions.

### Practical Example
```text
"email" → "sandeep@example.com"
"age"   → 20
```

### Step-by-Step
1. Key is passed to a hash function.
2. Hash value helps determine a bucket/index.
3. Value is stored there.
4. During lookup, the same process locates the key.

### Interview Follow-ups + Answers
**Q: Can hash table lookup become O(n)?**  
A: Yes, in unfavorable collision scenarios or poor implementation.

### Common Mistakes / Confusion
- O(1) is average/expected, not an absolute guarantee in every implementation.

### Mark as Learned
☐ Learned

---

## Q104. What is a Collision in Hashing?

### Core Answer
A **collision** occurs when two different keys map to the same hash-table bucket/index.

### Common Handling
- Chaining
- Open addressing

### Practical Example
```text
hash("cat") → bucket 5
hash("dog") → bucket 5
```

Both need to be handled correctly.

### Interview Follow-ups + Answers
**Q: Can collisions be completely eliminated?**  
A: Not generally for arbitrary keys when the key space is larger than the bucket space. Good hash functions and table design minimize problems.

### Common Mistakes / Confusion
- Collision does not mean the hash table is broken.

### Mark as Learned
☐ Learned

---

## Q105. What is a Binary Tree?

### Core Answer
A **binary tree** is a tree data structure where each node has at most two children:
- Left child
- Right child

### Practical Example
```text
        10
       /  \
      5    15
```

### Interview Follow-ups + Answers
**Q: Is every binary tree a BST?**  
A: No. A BST follows ordering rules; a general binary tree does not have to.

### Common Mistakes / Confusion
- Binary means maximum two children, not exactly two.

### Mark as Learned
☐ Learned

---

## Q106. What is a Binary Search Tree?

### Core Answer
A **Binary Search Tree (BST)** is a binary tree where values follow an ordering rule, commonly:

- Left subtree values < node value
- Right subtree values > node value

Duplicates depend on implementation.

### WHY / Concept Clarity
This ordering can make searching efficient when the tree is balanced.

### Complexity
- Average balanced-like case: O(log n)
- Worst case: O(n)

### Interview Follow-ups + Answers
**Q: Why can BST become O(n)?**  
A: If it becomes highly skewed, it behaves like a linked list.

### Common Mistakes / Confusion
- BST is not automatically balanced.

### Mark as Learned
☐ Learned

---

## Q107. What is a Heap and where is it used?

### Core Answer
A **heap** is a complete binary tree-based data structure that satisfies a heap property.

- Min-heap → parent ≤ children
- Max-heap → parent ≥ children

### Practical Uses
- Priority Queue
- Scheduling
- Dijkstra's algorithm
- Heap Sort

### Interview Follow-ups + Answers
**Q: Is a heap fully sorted?**  
A: No. It only guarantees the heap property.

### Common Mistakes / Confusion
- Heap ≠ fully sorted array.

### Mark as Learned
☐ Learned

---

## Q108. What is a Graph?

### Core Answer
A **graph** is a data structure consisting of:
- Vertices/nodes
- Edges/connections

Graphs can be:
- Directed/undirected
- Weighted/unweighted
- Cyclic/acyclic

### Practical Example
Social network:
- Person = vertex
- Friendship/follow relationship = edge

### Interview Follow-ups + Answers
**Q: Tree vs graph?**  
A: A tree is a special connected acyclic graph with specific structural properties.

### Common Mistakes / Confusion
- Every graph is not a tree.

### Mark as Learned
☐ Learned

---

## Q109. What is Dynamic Programming?

### Core Answer
**Dynamic Programming (DP)** solves problems by breaking them into overlapping subproblems and storing previously computed results.

Two common approaches:
- Memoization → top-down
- Tabulation → bottom-up

### WHY / Concept Clarity
If the same subproblem is calculated repeatedly, storing its answer avoids repeated work.

### Practical Example
Fibonacci:

```text
fib(n) = fib(n-1) + fib(n-2)
```

Naive recursion repeats many calculations. DP stores previous results.

### Interview Follow-ups + Answers
**Q: What are two important properties often seen in DP problems?**  
A: Overlapping subproblems and optimal substructure.

### Common Mistakes / Confusion
- DP is not simply “using an array.”
- First identify the state and transition.

### Mark as Learned
☐ Learned

---

## Q110. What is Greedy Algorithm?

### Core Answer
A **greedy algorithm** makes the best-looking local choice at each step, hoping that these choices produce a globally optimal solution.

### Practical Example
Activity selection is a classic greedy problem.

### WHY / Concept Clarity
Greedy is efficient when the problem has the required structural properties that make local optimal choices safe.

### Interview Follow-ups + Answers
**Q: Does greedy always give the optimal answer?**  
A: No. Only for problems where a greedy-choice property can be justified.

### Common Mistakes / Confusion
- “Take the largest/smallest value every time” is not automatically correct.

### Mark as Learned
☐ Learned

---

## Q111. What is a SQL Index?

### Core Answer
A **database index** is a data structure that helps the database find rows more efficiently.

### WHY / Concept Clarity
Without a suitable index, the database may need to scan many rows.

### Practical Example
If users are frequently searched by email:

```sql
CREATE INDEX idx_users_email
ON users(email);
```

### Trade-off
Indexes can:
- Improve reads
- Require storage
- Add overhead to INSERT/UPDATE/DELETE

### Interview Follow-ups + Answers
**Q: Should every column be indexed?**  
A: No. Indexes should be chosen based on query patterns and workload.

### Common Mistakes / Confusion
- More indexes do not always mean better performance.

### Mark as Learned
☐ Learned

---

## Q112. What is a Composite Index?

### Core Answer
A **composite index** is an index built on multiple columns.

Example:

```sql
CREATE INDEX idx_orders_customer_date
ON orders(customer_id, order_date);
```

### WHY / Concept Clarity
It can help queries that filter/sort using the indexed column combination.

### Interview Follow-ups + Answers
**Q: Does column order matter?**  
A: Yes. The order of columns in a composite index can affect which queries can efficiently use it.

### Common Mistakes / Confusion
- `(A, B)` is not always equivalent to `(B, A)` for index usage.

### Mark as Learned
☐ Learned

---

## Q113. What is a Database View?

### Core Answer
A **view** is a virtual table defined by a query.

Example:

```sql
CREATE VIEW active_users AS
SELECT id, name
FROM users
WHERE status = 'active';
```

### WHY / Concept Clarity
Views can simplify complex queries and provide controlled access to selected data.

### Interview Follow-ups + Answers
**Q: Does a normal view always store a separate copy of data?**  
A: No. A standard view stores the query definition; materialized views are different.

### Common Mistakes / Confusion
- View ≠ automatically duplicated physical table.

### Mark as Learned
☐ Learned

---

## Q114. What is a Transaction in DBMS?

### Core Answer
A **transaction** is a logical unit of database work that should be completed according to transaction rules.

Example: Bank transfer.

### Step-by-Step
1. Deduct money from Account A.
2. Add money to Account B.
3. Commit if both operations succeed.
4. Roll back if required.

### Interview Follow-ups + Answers
**Q: Which ACID property ensures all-or-nothing behavior?**  
A: Atomicity.

### Common Mistakes / Confusion
- Transaction is not necessarily only one SQL statement.

### Mark as Learned
☐ Learned

---

## Q115. What is Context Switching in OS?

### Core Answer
**Context switching** occurs when the OS switches CPU execution from one process/thread to another by saving and restoring execution state.

### WHY / Concept Clarity
It enables multitasking.

### Trade-off
Context switching has overhead because CPU time is spent managing execution state rather than directly doing application work.

### Interview Follow-ups + Answers
**Q: Is context switching free?**  
A: No. It has overhead.

### Common Mistakes / Confusion
- More context switches are not automatically better.

### Mark as Learned
☐ Learned

---

## Q116. What is Virtual Memory?

### Core Answer
**Virtual memory** gives processes the abstraction of a larger/private memory space and allows the OS to use secondary storage as backing for memory when appropriate.

### WHY / Concept Clarity
Each process can operate in its own virtual address space, improving isolation and simplifying memory management.

### Practical Example
A process may use virtual addresses that the OS maps to physical RAM pages.

### Interview Follow-ups + Answers
**Q: Is virtual memory the same as RAM?**  
A: No. Virtual memory is an abstraction; RAM is physical memory.

### Common Mistakes / Confusion
- Virtual memory is not simply “extra RAM.”

### Mark as Learned
☐ Learned

---

## Q117. What is a JavaScript Promise?

### Core Answer
A **Promise** represents the eventual result of an asynchronous operation.

States:
- Pending
- Fulfilled
- Rejected

### Practical Example
```js
fetch("/api/users")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

### WHY / Concept Clarity
Promises make asynchronous success/failure handling more structured than deeply nested callbacks.

### Interview Follow-ups + Answers
**Q: Does creating a Promise automatically make all code asynchronous?**  
A: No. Promise behavior and asynchronous operations need to be understood separately.

### Common Mistakes / Confusion
- A Promise is not the returned data itself; it represents a future result.

### Mark as Learned
☐ Learned

---

## Q118. What is the JavaScript Event Loop?

### Core Answer
The **event loop** coordinates execution of JavaScript's call stack with asynchronous callbacks/tasks so JavaScript can handle non-blocking operations.

### Practical Example
```js
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");
```

Output:

```text
A
C
B
```

### WHY / Concept Clarity
`setTimeout(..., 0)` does not mean “run immediately.” Its callback becomes eligible after the current synchronous work and scheduling rules allow it to run.

### Interview Follow-ups + Answers
**Q: Is JavaScript single-threaded?**  
A: JavaScript execution is traditionally described as single-threaded per main execution context, while the runtime can use other threads/components for asynchronous operations.

### Common Mistakes / Confusion
- `setTimeout(0)` is not immediate execution.
- Do not say JavaScript itself has no concurrency mechanisms.

### Mark as Learned
☐ Learned

---

## Q119. What is Closure in JavaScript?

### Core Answer
A **closure** occurs when a function remembers and can access variables from its lexical scope even after the outer function has finished executing.

### Practical Example
```js
function counter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const next = counter();

console.log(next()); // 1
console.log(next()); // 2
```

### WHY / Concept Clarity
The inner function retains access to `count`.

### Interview Follow-ups + Answers
**Q: Where are closures used?**  
A: Data privacy patterns, callbacks, event handlers, function factories and many JavaScript abstractions.

### Common Mistakes / Confusion
- Closure is not simply “a nested function.”
- The important point is retained lexical access.

### Mark as Learned
☐ Learned

---

## Q120. What is CORS?

### Core Answer
**CORS (Cross-Origin Resource Sharing)** is a browser security mechanism that controls whether a web page from one origin can access resources from another origin.

### WHY / Concept Clarity
Browsers enforce the same-origin policy. Servers can provide CORS response headers to allow specific cross-origin requests.

### Practical Example
Frontend:

`http://localhost:3000`

Backend:

`http://localhost:5000`

Different origins can trigger CORS behavior in the browser.

### Interview Follow-ups + Answers
**Q: Is CORS mainly a server-to-server restriction?**  
A: No. CORS is primarily enforced by browsers for web requests initiated by browser-based JavaScript.

### Common Mistakes / Confusion
- CORS is not the same as authentication.
- Postman may not behave like a browser with respect to CORS enforcement.

### Mark as Learned
☐ Learned
