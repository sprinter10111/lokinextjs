export const convertContentToString = (contentArray:any) => { 
    return contentArray
      .map((block:any) => block.children.map((child:any) => child.text).join('\n'))
      .join('\n\n');
  }; 