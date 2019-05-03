# list memos(service -> ui)
```
memos: [
  {
    id: 1,
    title: "title1",
    body: body,
    createdAt: UNIXTIME,
    updatedAt: UNIXTIME
  },
  {
    id: 2,
    title: "title2",
    body: body,
    createdAt: UNIXTIME,
    updatedAt: UNIXTIME
  }
]
```

# get memo(service -> ui)

```
{
  id: 1,
  title: "title1",
  body: body,
  createdAt: UNIXTIME,
  updatedAt: UNIXTIME
}
```


# save memo(ui -> service)
以下はバック側のお仕事
- id(dataに存在していればupdate, なければcreate)
- createdAt: UNIXTIME,
- updatedAt: UNIXTIME

```
{
    title: "title1",
    body: body,
}
```
