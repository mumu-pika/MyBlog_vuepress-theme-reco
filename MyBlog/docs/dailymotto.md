---
title: 名言金句
date: 2022-05-28
---


<marquee>
<Boxx type="tip" :blockStyle="titleStyle" :titleStyle="titleStyle" changeTime="3000"/>
<Boxx type="warning" :blockStyle="titleStyle" :titleStyle="titleStyle" changeTime="1000"/>
<Boxx type="danger" :blockStyle="contentStyle" :contentStyle="contentStyle"changeTime="1000"/>
<script>
	export default {
		data() {
			return {
				blockStyle: {'background':'#eee','color':'red'},
        titleStyle: {'margin-right': '10%','font-size':'16px'},
        contentStyle: {'margin-right': '20%','font-size':'10px',
                        "margin-top": "1rem","margin-bottom": "0.4rem"},
			}
		}
	}
</script>
</marquee>

<!-- <marquee>
<Boxx :blockStyle="blockStyle"  />
<Boxx type="warning" :blockStyle="titleStyle" :titleStyle="titleStyle" changeTime="1000" title="我是一个大大的且变化的 title"/>
<Boxx type="danger" :blockStyle="contentStyle" :contentStyle="contentStyle" content="我是一个小小的<br><marquee>content</marquee>"/>
</marquee>

<script>
	export default {
		data() {
			return {
				blockStyle: {'background':'#eee','color':'red'},
                titleStyle: {'margin-right': '10%','font-size':'16px'},
                contentStyle: {'margin-right': '20%','font-size':'10px',
                               "margin-top": "1rem","margin-bottom": "0.4rem"},
			}
		}
	}
</script> -->