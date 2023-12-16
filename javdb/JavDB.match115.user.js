// ==UserScript==
// @name            JavDB.match115
// @namespace       JavDB.match115@blc
// @version         0.0.1
// @author          blc
// @description     115 网盘匹配
// @match           https://javdb.com/*
// @icon            https://s1.ax1x.com/2022/04/01/q5lzYn.png
// @require         file:///Users/bolinc/Projects/JavPack/libs/JavPack.Util.lib.js
// @require         file:///Users/bolinc/Projects/JavPack/libs/JavPack.Req.lib.js
// @require         file:///Users/bolinc/Projects/JavPack/libs/JavPack.Req115.lib.js
// @require         file:///Users/bolinc/Projects/JavPack/libs/JavPack.Util115.lib.js
// @supportURL      https://t.me/+bAWrOoIqs3xmMjll
// @connect         115.com
// @run-at          document-end
// @grant           GM_xmlhttpRequest
// @grant           GM_deleteValue
// @grant           GM_listValues
// @grant           GM_openInTab
// @grant           GM_setValue
// @grant           GM_getValue
// @license         GPL-3.0-only
// @compatible      chrome last 2 versions
// @compatible      edge last 2 versions
// ==/UserScript==

(function () {
  Util.upStore();

  const SELECTOR = "x-match-item";
  const VOID = "javascript:void(0);";
  const DriveChannel = new BroadcastChannel("DriveChannel");

  const handleClick = () => {
    document.addEventListener("click", (e) => {
      if (!e.target.classList.contains(SELECTOR)) return;

      e.preventDefault();
      e.stopPropagation();

      const { pc } = e.target.dataset;
      if (pc) Util.openTab(`https://v.anxia.com/?pickcode=${pc}`);
    });

    document.addEventListener("contextmenu", (e) => {
      if (!e.target.classList.contains(SELECTOR)) return;

      e.preventDefault();
      e.stopPropagation();

      const { cid } = e.target.dataset;
      if (cid) Util.openTab(`https://115.com/?cid=${cid}&offset=0&tab=&mode=wangpan`);
    });
  };

  if (location.pathname.startsWith("/v/")) return; // 详情页暂不处理

  const childList = document.querySelectorAll(".movie-list .item");
  if (!childList.length) return;

  handleClick();

  class QueueMatch {
    static list = [];
    static lock = false;
    static insertHTML = `<a class="${SELECTOR} tag is-normal" href="${VOID}">匹配中</a>&nbsp;`;

    static async add(items) {
      items = this.handleBefore(items);
      if (!items?.length) return;

      this.list.push(...items);
      if (this.lock || !this.list.length) return;

      this.lock = true;
      await this.handleMatch();
      this.lock = false;
    }

    static handleBefore(items) {
      return [...items]
        .map((item) => {
          const title = item.querySelector(".video-title");
          let tag = title.querySelector(`.${SELECTOR}`);
          if (!tag) {
            item.classList.add(`x-${item.querySelector("a").href.split("/").pop()}`);
            title.insertAdjacentHTML("afterbegin", this.insertHTML);
            tag = title.querySelector(`.${SELECTOR}`);
          }
          const code = title.querySelector("strong").textContent;
          return { tag, code, ...Util.codeParse(code) };
        })
        .filter(this.handleFilter);
    }

    static handleFilter = ({ tag, code, prefix, regex }) => {
      let res = GM_getValue(code);
      if (res) return this.setTag(tag, res);

      res = GM_getValue(prefix);
      if (!res) return true;

      this.setTag(
        tag,
        res.filter((item) => regex.test(item.n)),
      );
    };

    static async handleMatch() {
      const prefixMap = this.list
        .splice(0)
        .filter(this.handleFilter)
        .reduce((acc, { prefix, ...item }) => {
          acc[prefix] ??= [];
          acc[prefix].push(item);
          return acc;
        }, {});

      await Promise.allSettled(Object.entries(prefixMap).map(this.handleMatchPrefix));
      if (this.list.length) return this.handleMatch();
    }

    static handleMatchPrefix = ([prefix, list]) => {
      return Util115.videosSearch(prefix).then(({ data }) => {
        data = data.map(({ pc, cid, t, n }) => ({ pc, cid, t, n }));
        GM_setValue(prefix, data);

        list.forEach(({ tag, regex }) => {
          this.setTag(
            tag,
            data.filter((item) => regex.test(item.n)),
          );
        });
      });
    };

    static setTag(tag, res) {
      let textContent = "未匹配";
      let title = "";
      let pc = "";
      let cid = "";
      let className = "";

      if (res.length) {
        const zhRes = res.find((item) => Util.zhReg.test(item.n));
        const item = zhRes ?? res[0];

        textContent = "已匹配";
        title = `[${item.t}] ${item.n}`;
        pc = item.pc;
        cid = item.cid;
        className = zhRes ? "is-warning" : "is-success";
      }

      tag.textContent = textContent;
      tag.title = title;
      tag.dataset.pc = pc;
      tag.dataset.cid = cid;
      tag.setAttribute("class", `${SELECTOR} tag is-normal ${className}`);
    }
  }

  DriveChannel.onmessage = ({ data }) => {
    const nodeList = document.querySelectorAll(`.movie-list .x-${data}`);
    if (nodeList.length) QueueMatch.add(nodeList);
  };

  const intersectionCallback = (entries, observer) => {
    const intersected = [];
    entries.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return;
      observer.unobserve(target);
      intersected.push(target);
    });
    if (intersected.length) QueueMatch.add(intersected);
  };
  const intersectionObserver = new IntersectionObserver(intersectionCallback, { threshold: 0.2 });

  childList.forEach((node) => intersectionObserver.observe(node));
  window.addEventListener("loadmore", ({ detail }) => detail.forEach((node) => intersectionObserver.observe(node)));
})();
