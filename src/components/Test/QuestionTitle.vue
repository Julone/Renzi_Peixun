   <template #label>
       <p>
          <van-tag type="primary">{{el.tmTypeLabel}}</van-tag> {{el.tmSort}}: {{el.tmName}}
           
           <span> ( {{el.tmfz}}分 )</span>
          
       </p>
   </template>
   <script>
       export default {
           props: ['el']
       }
   </script>